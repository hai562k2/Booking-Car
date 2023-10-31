import { Module } from '@nestjs/common';
import { ReasonsService } from './reasons.service';
import { ReasonsController } from './reasons.controller';
import { Reason } from './reason.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Reason])],
  providers: [ReasonsService],
  controllers: [ReasonsController],
})
export class ReasonsModule {}
