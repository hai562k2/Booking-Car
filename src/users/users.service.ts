import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { EntityCondition } from '../utils/types/entity-condition';
import { NullableType } from '../utils/types/nullables.type';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Department } from '../departments/department.entity';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Vehicle } from '../vehicles/vehicle.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(
    createProfileDto: CreateUserDto,
    department: Department,
    vehicle?: Vehicle,
  ): Promise<User> {
    const { departmentId, vehicleId, ...userData } = createProfileDto;
    const user = this.userRepository.create(userData);
    user.department = department;
    user.vehicle = vehicle;
    return this.userRepository.save(user);
  }

  findOne(fields: EntityCondition<User>): Promise<NullableType<User>> {
    return this.userRepository.findOne({
      where: fields,
    });
  }

  find(id: number, attrs: DeepPartial<User>) {}

  findManyWithPagination(
    paginationOptions: IPaginationOptions,
  ): Promise<User[]> {
    return this.userRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  async update(id: number, payLoad: Partial<User>) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    Object.assign(user, payLoad);
    return await this.userRepository.save(user);
  }

  remove() {}
}
