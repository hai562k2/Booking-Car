import {
  Body,
  Controller,
  Patch,
  Post,
  UseGuards,
  Param,
  Get,
} from '@nestjs/common';
import { CreateVehicleDto } from './dtos/create-vehicle-dto';
import { VehiclesService } from './vehicles.service';
import { RolesGuard } from '../common/guards/roles.guard';
import { Role } from '../roles/roles.enum';
import { Roles } from '../common/decorators';
import { UpdateVehicleDto } from './dtos/update-vehicle-status.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Vehicles')
@ApiBearerAuth()
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post('/create')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  create(@Body() body: CreateVehicleDto) {
    return this.vehiclesService.create(body);
  }

  @Patch('/updatestatus/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.DRIVER)
  async updateStatus(@Param('id') id: string, @Body() body: UpdateVehicleDto) {
    return await this.vehiclesService.updateStatus(parseInt(id), body);
  }

  @Get('/getall')
  async findAll() {
    return this.vehiclesService.findAll();
  }
}
