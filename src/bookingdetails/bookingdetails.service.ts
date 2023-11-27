import {
  Injectable,
  Post,
  Body,
  Get,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateBookingDetailDto } from './dtos/create-bookingdetails.dto';
import { Department } from '../departments/department.entity';
import { BookingDetail } from './bookingdetails.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from '../vehicles/vehicle.entity';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { User } from '../users/user.entity';
import { EntityCondition } from '../utils/types/entity-condition';
import { NullableType } from '../utils/types/nullables.type';
import { StatusBookings } from './status-booking.enum';
import { Reason } from '../reasons/reason.entity';
import { Role } from '../roles/roles.enum';

@Injectable()
export class BookingdetailsService {
  constructor(
    @InjectRepository(BookingDetail)
    private bookingDetailRepository: Repository<BookingDetail>,
  ) {}

  async create(
    createBookingDetailDto: CreateBookingDetailDto,
    vehicle: Vehicle,
    user: User,
  ): Promise<BookingDetail> {
    const bookingDetail = this.bookingDetailRepository.create(
      createBookingDetailDto,
    );
    bookingDetail.vehicle = vehicle;
    bookingDetail.user = user;
    return this.bookingDetailRepository.save(bookingDetail);
  }

  async findManyWithPagination(
    paginationOptions: IPaginationOptions,
  ): Promise<BookingDetail[]> {
    return await this.bookingDetailRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  async findOne(
    fields: EntityCondition<BookingDetail>,
  ): Promise<NullableType<BookingDetail>> {
    return await this.bookingDetailRepository.findOne({
      where: fields,
    });
  }

  async findBookingDetail(id: number) {
    const bookingDetail = await this.bookingDetailRepository.findOne({
      where: { id: id },
    });

    if (!bookingDetail) {
      throw new NotFoundException('Booking not found');
    }

    return bookingDetail;
  }

  async updateStatus(newStatusBooking: StatusBookings, id: number) {
    await this.bookingDetailRepository
      .createQueryBuilder('booking_detail')
      .update(BookingDetail)
      .set({
        statusBooking: newStatusBooking,
      })
      .where('id = :id', { id: id })
      .execute();
  }

  async accessAndCancelBooking(id: number, role: string) {
    //Check bookingDetail is Exists
    const bookingDetail = await this.findBookingDetail(id);
    if (
      bookingDetail.statusBooking != StatusBookings.PENDING_ACCESS &&
      bookingDetail.statusBooking != StatusBookings.PENDING_CANCEL
    ) {
      throw new ForbiddenException('Cannot update unless status is pending');
    }

    //Accept request
    if (
      (role === Role.HRADMIN || role === Role.ADMIN) &&
      bookingDetail.area === 'urban'
    ) {
      if (bookingDetail.statusBooking === StatusBookings.PENDING_ACCESS) {
        await this.updateStatus(StatusBookings.ACCESS, id);
      }
      await this.updateStatus(StatusBookings.CANCEL, id);
    } else if (
      (role === Role.BOARD || role === Role.ADMIN) &&
      bookingDetail.area === 'suburban'
    ) {
      if (bookingDetail.statusBooking === StatusBookings.PENDING_ACCESS) {
        await this.updateStatus(StatusBookings.ACCESS, id);
      }
      await this.updateStatus(StatusBookings.CANCEL, id);
    } else {
      throw new ForbiddenException('You cannot chage!');
    }
    const updatedBookingDetail = await this.findBookingDetail(id);
    return updatedBookingDetail.statusBooking;
  }
}
