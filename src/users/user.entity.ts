import { Department } from 'src/departments/department.entity';
import { Reason } from 'src/reasons/reason.entity';
import { Vehicle } from 'src/vehicles/vehicle.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: number;

  @Column()
  fullname: string;

  @Column()
  avatar: string;

  @Column()
  role: string;

  @ManyToOne(() => Department, (department) => department.users, {
    onDelete: 'CASCADE',
  })
  department: Department;

  @OneToOne(() => Vehicle)
  @JoinColumn()
  vehicle: Vehicle;

  @OneToMany(() => Reason, (reason) => reason.user)
  reasons: Reason[];
}
