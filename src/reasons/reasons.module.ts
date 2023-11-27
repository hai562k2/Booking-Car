import { Module } from '@nestjs/common';
import { ReasonsService } from './reasons.service';
import { Reason } from './reason.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReasonsController } from './reasons.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Reason])],
  providers: [ReasonsService],
  exports: [ReasonsService],
})
export class ReasonsModule {}
