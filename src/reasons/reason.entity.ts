import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { BookingDetail } from '../bookingdetails/bookingdetails.entity';

@Entity()
export class Reason {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reason_cancel_department: string;

  @CreateDateColumn()
  time_cancel: Date;

  @Column()
  time_booking_department: Date;

  @Column({ nullable: true })
  reason_cancel_reviewer: number;

  @Column({ nullable: true })
  time_cancel_reviewer: Date;

  @Column({ nullable: true })
  time_booking_reviwer: Date;

  @ManyToOne(() => User, (user) => user.reasons)
  user: User;

  @OneToOne(() => BookingDetail)
  @JoinColumn()
  bookingDetail: BookingDetail;
}
