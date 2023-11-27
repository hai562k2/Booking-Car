import { BookingDetail } from '../bookingdetails/bookingdetails.entity';
import { Department } from '../departments/department.entity';
import { Reason } from '../reasons/reason.entity';
import { Role } from '../roles/roles.enum';

import { Vehicle } from '../vehicles/vehicle.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  OneToOne,
  JoinColumn,
  Unique,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  fullname: string;

  @Column()
  avatar: string;

  @Column({ type: 'enum', enum: Role, default: Role.DRIVER })
  role: string;

  @Column({ default: null })
  hashedRt: string;

  @ManyToOne(() => Department, (department) => department.users, {
    onDelete: 'CASCADE',
  })
  department?: Department;

  @OneToOne(() => Vehicle)
  @JoinColumn()
  vehicle?: Vehicle;

  @OneToMany(() => Reason, (reason) => reason.user)
  reasons?: Reason[];

  @OneToMany(() => BookingDetail, (bookingdetail) => bookingdetail.user)
  bookingdetails?: BookingDetail[];
}
