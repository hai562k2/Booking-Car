import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dtos/create-department.dto';
import { Department } from './department.entity';

@Controller('departments')
export class DepartmentsController {
  constructor(private departmenstService: DepartmentsService) {}

  @Post()
  createDepartment(@Body() body: CreateDepartmentDto): Promise<Department> {
    return this.departmenstService.create(body);
  }

  @Get('/:id')
  async findDepartment(@Param() id: string) {
    const department = await this.departmenstService.getById(parseInt(id));
    if (!department) {
      throw new NotFoundException('Department not found!');
    }
    return department;
  }
}
