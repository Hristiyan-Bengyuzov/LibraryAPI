import { Module } from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { RentalsController } from './rentals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rental } from './entities/rental.entity';
import { BooksModule } from 'src/books/books.module';
import { MembersModule } from 'src/members/members.module';

@Module({
  imports: [TypeOrmModule.forFeature([Rental]), BooksModule, MembersModule],
  controllers: [RentalsController],
  providers: [RentalsService],
})
export class RentalsModule {}
