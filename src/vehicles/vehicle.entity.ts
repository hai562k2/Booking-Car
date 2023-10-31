import { BookingDetail } from 'src/bookingdetails/bookingdetails.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  license_plate: string;

  @Column()
  seats: number;

  @Column()
  status_vehicle: string;

  @OneToMany(() => BookingDetail, (bookingdetail) => bookingdetail.vehicle)
  bookingdetails: BookingDetail[];
}
