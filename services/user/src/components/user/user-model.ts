import bcrypt from 'bcryptjs';
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
import {
  IsEmail,
  IsAlpha,
  IsAlphanumeric,
  MinLength,
  IsEnum,
  IsOptional,
  validate,
} from 'class-validator';

import { UserAttributes, UserType } from './user-types';

@Entity()
class User extends BaseEntity implements UserAttributes {
  @PrimaryGeneratedColumn('uuid')
  userUniqueIndentifier!: string;

  @Column({ unique: true })
  @IsAlphanumeric('en-US', {
    message: 'User handle must contain only letters and numbers',
  })
  @MinLength(5, {
    message:
      'User handle must be longer than or equal to $constraint1 characters',
  })
  userHandle!: string;

  @Column()
  @IsAlpha('en-US', {
    message: 'User first name must contain only letters',
  })
  @MinLength(3, {
    message:
      'User first name must be longer than or equal to $constraint1 characters',
  })
  userFirstName!: string;

  @Column()
  @IsAlpha('en-US', {
    message: 'User last name must contain only letters',
  })
  @MinLength(3, {
    message:
      'User last name must be longer than or equal to $constraint1 characters',
  })
  userLastName!: string;

  @Column({ unique: true })
  @IsEmail({}, { message: 'Email must be in valid format' })
  userEmailAddress!: string;

  @Column()
  @IsAlphanumeric('en-US', {
    message: 'User password must contain only letters and numbers',
  })
  @MinLength(7, {
    message:
      'User password must be longer than or equal to $constraint1 characters',
  })
  userPassword!: string;

  @Column({ type: 'enum', enum: UserType, default: UserType.standard })
  @IsOptional()
  @IsEnum(UserType)
  userRole!: UserType;

  @UpdateDateColumn({ nullable: true })
  userModifyDate!: Date;

  @CreateDateColumn()
  userRegisterDate!: Date;

  // TODO - return errors from here
  // check if this breaks hashing or password validation
  @BeforeInsert()
  @BeforeUpdate()
  async validate(): Promise<void> {
    const errors = await validate(this, {
      skipMissingProperties: false,
      forbidUnknownValues: true,
    });
    console.log(errors);
  }

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
