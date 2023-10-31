import { Test, TestingModule } from '@nestjs/testing';
import { BookingdetailsService } from './bookingdetails.service';

describe('BookingdetailsService', () => {
  let service: BookingdetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookingdetailsService],
    }).compile();

    service = module.get<BookingdetailsService>(BookingdetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
