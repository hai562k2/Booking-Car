import { Test, TestingModule } from '@nestjs/testing';
import { BookingdetailsController } from './bookingdetails.controller';

describe('BookingdetailsController', () => {
  let controller: BookingdetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingdetailsController],
    }).compile();

    controller = module.get<BookingdetailsController>(BookingdetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
