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
  deviceOwner!: string;

  @Column()
  deviceName!: string;

  @Column({ unique: true })
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
