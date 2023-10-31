import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/users/user.entity';
import { BookingDetail } from 'src/bookingdetails/bookingdetails.entity';

@Entity()
export class Reason {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reason_cancel_department: string;

  @Column()
  time_cancel: Date;

  @Column()
  time_booking_department: Date;

  @Column()
  reason_cancel_reviewer: number;

  @Column()
  time_cancel_reviewer: Date;

  @Column()
  time_booking_reviwer: Date;

  @ManyToOne(() => User, (user) => user.reasons)
  user: User;

  @OneToOne(() => BookingDetail)
  @JoinColumn()
  bookingDetail: BookingDetail;
}
