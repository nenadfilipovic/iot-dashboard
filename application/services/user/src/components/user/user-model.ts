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

import { UserAttributes, UserType } from './user-types';

@Entity()
class User extends BaseEntity implements UserAttributes {
  @PrimaryGeneratedColumn('uuid')
  userUniqueIndentifier!: string;

  @Column({ unique: true })
  userHandle!: string;

  @Column()
  userFirstName!: string;

  @Column()
  userLastName!: string;

  @Column({ unique: true })
  userEmailAddress!: string;

  @Column()
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
