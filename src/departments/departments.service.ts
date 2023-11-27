import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './department.entity';
import { Repository } from 'typeorm';
import { CreateDepartmentDto } from './dtos/create-department.dto';
import { EntityCondition } from '../utils/types/entity-condition';
import { NullableType } from '../utils/types/nullables.type';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  async create(departmentDto: CreateDepartmentDto): Promise<Department> {
    return this.departmentRepository.save(
      await this.departmentRepository.create(departmentDto),
    );
  }

  async getById(id: number) {
    if (!id) {
      return null;
    }
    return this.departmentRepository.findOneBy({ id });
  }

  findOne(
    fields: EntityCondition<Department>,
  ): Promise<NullableType<Department>> {
    return this.departmentRepository.findOne({
      where: fields,
    });
  }
}
