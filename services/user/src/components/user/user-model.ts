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
} from 'typeorm';
import {
  IsAlpha,
  IsAlphanumeric,
  MinLength,
  IsEnum,
  IsOptional,
  validate,
  IsEmail,
  Validate,
} from 'class-validator';

import { UserAttributes, Type } from './user-types';
import { appLogger } from '../../utils/logger';
import { IsUniqueInDatabase } from './user-validate';

const validationConfig = (isUpdate: boolean) => {
  return {
    skipMissingProperties: isUpdate,
    forbidUnknownValues: true,
    validationError: { target: false },
  };
};

@Entity()
class User extends BaseEntity implements UserAttributes {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  /**
   *
   */

  @Column({ unique: true })
  @Validate(IsUniqueInDatabase, { message: 'Handle is already in use' })
  @IsAlphanumeric('en-US', {
    message: 'User handle must contain only letters and numbers',
  })
  @MinLength(5, {
    message:
      'User handle must be longer than or equal to $constraint1 characters',
  })
  handle!: string;

  /**
   *
   */

  @Column()
  @IsAlpha('en-US', {
    message: 'User first name must contain only letters',
  })
  @MinLength(3, {
    message:
      'User first name must be longer than or equal to $constraint1 characters',
  })
  firstName!: string;

  /**
   *
   */

  @Column()
  @IsAlpha('en-US', {
    message: 'User last name must contain only letters',
  })
  @MinLength(3, {
    message:
      'User last name must be longer than or equal to $constraint1 characters',
  })
  lastName!: string;

  /**
   *
   */

  @Column({ unique: true })
  @Validate(IsUniqueInDatabase, { message: 'Email address is already in use' })
  @IsEmail({}, { message: 'Please provide valid email address' })
  emailAddress!: string;

  /**
   *
   */

  @Column()
  @IsAlphanumeric('en-US', {
    message: 'User password must contain only letters and numbers',
  })
  @MinLength(7, {
    message:
      'User password must be longer than or equal to $constraint1 characters',
  })
  password!: string;

  /**
   *
   */

  @Column({ type: 'enum', enum: Type, default: Type.standard })
  @IsOptional()
  @IsEnum(Type)
  role!: Type;

  /**
   *
   */

  @UpdateDateColumn({ nullable: true })
  modifyDate!: Date;

  /**
   *
   */

  @CreateDateColumn()
  registerDate!: Date;

  /**
   *
   */

  @BeforeInsert()
  async actionsBeforeInsert(): Promise<void> {
    /**
     * First validate input
     */
    console.log('insert');

    const errors = await validate(this, validationConfig(false));
    console.log(errors);

    /**
     * Second hash password to avoid problems
     */

    if (!!this.password) {
      this.password = await bcrypt.hash(this.password, 12);
    }
  }

  /**
   *
   */

  @BeforeUpdate()
  async actionsBeforeUpdate(): Promise<void> {
    /**
     * First validate input
     */
    console.log('update');

    const errors = await validate(this, validationConfig(true));
    console.log(errors);

    /**
     * Second hash password to avoid problems
     */

    if (!!this.password) {
      this.password = await bcrypt.hash(this.password, 12);
    }
  }

  /**
   *
   */

  @AfterInsert()
  actionsAfterInsert(): void {
    appLogger.info(`User: ${this.id} successfully registered.`);
  }

  /**
   *
   */

  @AfterUpdate()
  actionsAfterUpdate(): void {
    appLogger.info(`User: ${this.id} data successfully modified.`);
  }

  /**
   *
   */

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}

export { User };
