import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsInt, IsBoolean, IsOptional } from 'class-validator';
import { CreateVehicleDto } from './create-vehicle-dto';

export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {
  @IsString()
  @IsOptional()
  type: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsString()
  @IsOptional()
  license_plate: string;

  @IsInt()
  @IsOptional()
  seats?: number;

  @IsBoolean()
  @IsOptional()
  status_vehicle: boolean;
}
