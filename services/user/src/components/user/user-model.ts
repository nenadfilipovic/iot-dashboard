import bcrypt from 'bcryptjs';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BaseEntity,
  AfterInsert,
  AfterUpdate,
  BeforeUpdate,
  AfterLoad,
  AfterRemove,
  Index,
} from 'typeorm';

import { UserAttributes, Role } from './user-types';
import { appLogger } from '../../utils/logger';

@Entity()
class User extends BaseEntity implements UserAttributes {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index('handle', { unique: true })
  @Column()
  handle!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Index('email address', { unique: true })
  @Column()
  emailAddress!: string;

  @Column()
  password!: string;

  @Column({ type: 'enum', enum: Role, default: Role.standard })
  role!: Role;

  @UpdateDateColumn({ nullable: true })
  modifyDate!: Date;

  @CreateDateColumn()
  registerDate!: Date;

  private tempPassword!: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.tempPassword !== this.password) {
      this.password = await bcrypt.hash(this.password, 12);
    }
  }

  @AfterLoad()
  private loadTempPassword(): void {
    this.tempPassword = this.password;
  }

  @AfterInsert()
  logAfterInsert(): void {
    appLogger.info(`User: ${this.handle} successfully registered`);
  }

  @AfterUpdate()
  logAfterUpdate(): void {
    appLogger.info(`User: ${this.handle} data successfully modified`);
  }

  @AfterRemove()
  logAfterRemove(): void {
    appLogger.info(`User: ${this.handle} successfully removed`);
  }

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }

  toJSON(): this {
    Object.assign(this, { password: undefined, tempPassword: undefined });
    return this;
  }
}

export { User };
