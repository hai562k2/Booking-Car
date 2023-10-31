import { Vehicle } from 'src/vehicles/vehicle.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class BookingDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  time_start: Date;

  @Column()
  time_end: Date;

  @Column()
  location_start: string;

  @Column()
  location_end: string;

  @Column()
  number_passenger: number;

  @Column()
  position_title: string;

  @Column()
  status_booking: string;

  @Column()
  area: string;

  @Column()
  reason_booking: string;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.bookingdetails)
  vehicle: Vehicle;

  
}
