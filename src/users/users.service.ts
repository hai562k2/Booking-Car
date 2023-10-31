import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition';
import { NullableType } from 'src/utils/types/nullables.type';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Department } from 'src/departments/department.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(
    createProfileDto: CreateUserDto,
    department: Department,
  ): Promise<User> {
    const { departmentId, ...userData } = createProfileDto;
    const user = this.userRepository.create(userData);
    user.department = department;
    return this.userRepository.save(user);
  }

  findOne(fields: EntityCondition<User>): Promise<NullableType<User>> {
    return this.userRepository.findOne({
      where: fields,
    });
  }

  find(id: number, attrs: DeepPartial<User>) {}

  update(updateProfileDto: UpdateUserDto, attrs: DeepPartial<User>) {
    const user = this.userRepository.findOne;
    if(!user) {
      throw new NotFoundException('User not found!');
    }
  }

  remove() {}
}
