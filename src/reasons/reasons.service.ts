import { Injectable } from '@nestjs/common';
import { Reason } from './reason.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ReasonsService {
  constructor(
    @InjectRepository(Reason) private reasonRepository: Repository<Reason>,
  ) {}

  
}
