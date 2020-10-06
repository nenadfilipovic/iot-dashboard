import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  AfterLoad,
  AfterInsert,
  AfterUpdate,
} from 'typeorm';

import { DeviceAttributes, Type } from './device-types';
import { appLogger } from '../../utils/logger';

@Entity()
class Device extends BaseEntity implements DeviceAttributes {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  owner!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  channel!: string;

  @Column({ nullable: true })
  description!: string;

  @Column({ type: 'enum', enum: Type, default: Type.esp8266 })
  type!: Type;

  topic!: string;

  @UpdateDateColumn({ nullable: true })
  modifyDate!: Date;

  @CreateDateColumn()
  registerDate!: Date;

  @AfterLoad()
  setTopic(): void {
    this.topic = this.owner + '/' + this.channel;
  }

  @AfterInsert()
  afterInsertActions(): void {
    appLogger.info(`Device: ${this.id} successfully created.`);
  }

  @AfterUpdate()
  afterUpdateActions(): void {
    appLogger.info(`Device: ${this.id} data successfully modified.`);
  }

  toJSON(): this {
    Object.assign(this, { topic: undefined });
    return this;
  }
}

export { Device };
