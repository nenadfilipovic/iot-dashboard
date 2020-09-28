import { IsString, IsUUID, IsAlphanumeric, Matches } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

import { DeviceAttributes, DeviceType } from './device-types';

@Entity()
class Device extends BaseEntity implements DeviceAttributes {
  @PrimaryGeneratedColumn('uuid')
  deviceUniqueIndentifier!: string;

  @Column()
  @IsUUID('4', { message: 'Invalid device owner identification format!' })
  deviceOwner!: string;

  @Column()
  @IsString({ message: 'Device name must be a string!' })
  @Matches(/^[a-zA-Z0-9.-]*$/, {
    message: 'Device name can only contain letters, numbers dash and dot!',
  })
  deviceName!: string;

  @Column({ unique: true })
  @IsAlphanumeric('en-US', {
    message: 'Device channel can only contain letters and numbers!',
  })
  deviceChannel!: string;

  @Column({ nullable: true })
  deviceDescription!: string;

  @Column({ type: 'enum', enum: DeviceType, default: DeviceType.esp8266 })
  deviceType!: DeviceType;

  @UpdateDateColumn({ nullable: true })
  deviceModifyDate!: Date;

  @CreateDateColumn()
  deviceRegisterDate!: Date;
}

export { Device };
