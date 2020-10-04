import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import {
  IsAlphanumeric,
  MinLength,
  IsEnum,
  IsOptional,
  validate,
} from 'class-validator';

import { DeviceAttributes, DeviceType } from './device-types';

@Entity()
class Device extends BaseEntity implements DeviceAttributes {
  @PrimaryGeneratedColumn('uuid')
  deviceUniqueIndentifier!: string;

  @Column()
  deviceOwner!: string;

  @Column()
  @IsAlphanumeric('en-US', {
    message: 'Device name must contain only letters and numbers',
  })
  @MinLength(3, {
    message:
      'Device name must be longer than or equal to $constraint1 characters',
  })
  deviceName!: string;

  @Column({ unique: true })
  @IsAlphanumeric('en-US', {
    message: 'Device channel must contain only letters and numbers',
  })
  @MinLength(5, {
    message:
      'Device channel must be longer than or equal to $constraint1 characters',
  })
  deviceChannel!: string;

  @Column({ nullable: true })
  @IsOptional()
  deviceDescription!: string;

  @Column({ type: 'enum', enum: DeviceType, default: DeviceType.esp8266 })
  @IsOptional()
  @IsEnum(DeviceType)
  deviceType!: DeviceType;

  deviceTopic!: string;

  @UpdateDateColumn({ nullable: true })
  deviceModifyDate!: Date;

  @CreateDateColumn()
  deviceRegisterDate!: Date;

  @AfterLoad()
  setTopic(): void {
    this.deviceTopic = this.deviceOwner + '/' + this.deviceChannel;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async validate(): Promise<void> {
    const errors = await validate(this, {
      skipMissingProperties: false,
      forbidUnknownValues: true,
    });
    console.log(errors);
  }
}

export { Device };
