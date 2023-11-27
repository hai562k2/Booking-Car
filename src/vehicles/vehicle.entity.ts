import { BookingDetail } from '../bookingdetails/bookingdetails.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  image: string;

  @Column()
  license_plate: string;

  @Column()
  seats: number;

  @Column({ default: true })
  status_vehicle: boolean;

  @OneToMany(() => BookingDetail, (bookingdetail) => bookingdetail.vehicle)
  bookingdetails: BookingDetail[];
}
