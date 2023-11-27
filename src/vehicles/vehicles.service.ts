import { Injectable, NotFoundException } from '@nestjs/common';
import { Vehicle } from './vehicle.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { CreateVehicleDto } from './dtos/create-vehicle-dto';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle) private vehicleRepository: Repository<Vehicle>,
  ) {}
  async updateStatus(id: number, payLoad: Partial<Vehicle>) {
    const vehicle = await this.vehicleRepository.findOne({ where: { id: id } });
    if (!vehicle) throw new NotFoundException('Vehicle not found!');
    Object.assign(vehicle, payLoad);
    return await this.vehicleRepository.save(vehicle);
  }

  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    const vehicleData: DeepPartial<Vehicle> = {
      type: createVehicleDto.type,
      image: createVehicleDto.image,
      seats: createVehicleDto.seats,
      license_plate: createVehicleDto.license_plate,
      status_vehicle: createVehicleDto.status_vehicle,
    };
    return this.vehicleRepository.save(
      this.vehicleRepository.create(vehicleData),
    );
  }

  async getById(id: number) {
    if (!id) {
      return null;
    }
    return await this.vehicleRepository.findOneBy({ id });
  }

  async findAll(): Promise<Vehicle[]> {
    return await this.vehicleRepository
      .createQueryBuilder('vehicle')
      .select([
        'vehicle.type',
        'vehicle.image',
        'vehicle.license_plate',
        'vehicle.seats',
      ])
      .addSelect(
        `CASE WHEN vehicle.status_vehicle = true THEN 'busy' ELSE 'ready' END`,
        'status_vehicle',
      )
      .getRawMany();
  }
}
