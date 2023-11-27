import { User } from '../users/user.entity';
import { Vehicle } from '../vehicles/vehicle.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StatusBookings } from './status-booking.enum';

@Entity()
export class BookingDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  request: string;

  @Column()
  departmentName: string;

  @Column()
  timeStart: Date;

  @Column()
  timeEnd: Date;

  @Column()
  locationStart: string;

  @Column()
  locationEnd: string;

  @Column()
  numberPassenger: number;

  @Column()
  positionTitle: string;

  @Column({ default: StatusBookings.PENDING_ACCESS })
  statusBooking: StatusBookings;

  @Column()
  area: string;

  @Column()
  reasonBooking: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.bookingdetails)
  vehicle: Vehicle;

  @ManyToOne(() => User, (user) => user.bookingdetails)
  user: User;
}
