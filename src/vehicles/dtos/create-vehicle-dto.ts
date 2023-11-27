import { IsString, IsInt, IsBoolean, IsOptional } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  type: string;

  @IsString()
  image: string;

  @IsString()
  license_plate: string;

  @IsInt()
  seats?: number;

  @IsBoolean()
  @IsOptional()
  status_vehicle: boolean;
}
