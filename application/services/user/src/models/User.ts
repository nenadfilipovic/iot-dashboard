import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  BaseEntity,
} from 'typeorm';
import bcrypt from 'bcryptjs';
import {
  MinLength,
  Length,
  IsEmail,
  IsAlpha,
  IsAlphanumeric,
  IsString,
} from 'class-validator';

import { UserAttributes, UserType } from '../types';

@Entity()
class User extends BaseEntity implements UserAttributes {
  @PrimaryGeneratedColumn('uuid')
  userUniqueIndentifier!: string;

  @Column({ unique: true })
  @IsString({
    message: 'User handle must be a string!',
  })
  @IsAlphanumeric('en-US', {
    message: 'User handle can only contain letters and numbers!',
  })
  @MinLength(6, {
    message: 'User handle should be at least 6 characters long!',
  })
  userHandle!: string;

  @Column()
  @IsString({ message: 'User first name must be a string!' })
  @IsAlpha('en-US', { message: 'User first name can only contain letters!' })
  @Length(3, 25, {
    message: 'User first name should be between 3 and 25 characters long!',
  })
  userFirstName!: string;

  @Column()
  @IsString({ message: 'User last name must be a string!' })
  @IsAlpha('en-US', { message: 'User last name can only contain letters!' })
  @Length(3, 25, {
    message: 'User last name should be between 3 and 25 characters long!',
  })
  userLastName!: string;

  @Column({ unique: true })
  @IsString({ message: 'User email address must be a string!' })
  @IsEmail({}, { message: 'Valid user email address must be provided!' })
  userEmailAddress!: string;

  @Column()
  @IsString({ message: 'User password must be a string!' })
  @MinLength(6, {
    message: 'User password should be at least 6 characters long!',
  })
  userPassword!: string;

  @Column({ type: 'enum', enum: UserType, default: UserType.standard })
  userRole!: UserType;

  @UpdateDateColumn({ nullable: true })
  userModifyDate!: Date;

  @CreateDateColumn()
  userRegisterDate!: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (!!this.userPassword) {
      this.userPassword = await bcrypt.hash(this.userPassword, 12);
    }
  }

  async validatePassword(userPassword: string): Promise<boolean> {
    return await bcrypt.compare(userPassword, this.userPassword);
  }
}

export { User };
