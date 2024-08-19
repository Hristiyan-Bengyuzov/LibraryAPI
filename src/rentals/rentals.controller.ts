import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { Rental } from './entities/rental.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('rentals')
@Controller('rentals')
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

  @ApiOperation({ summary: 'Create a new rental' })
  @ApiResponse({
    status: 201,
    description: 'The rental has been successfully created.',
    type: Rental,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input.',
  })
  @Post()
  async create(@Body() createRentalDto: CreateRentalDto): Promise<Rental> {
    return await this.rentalsService.create(createRentalDto);
  }

  @ApiOperation({ summary: 'Get all rentals' })
  @ApiResponse({
    status: 200,
    description: 'Returns all rentals.',
    type: [Rental],
  })
  @Get()
  async findAll(): Promise<Rental[]> {
    return await this.rentalsService.findAll();
  }

  @ApiOperation({ summary: 'Get a rental by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the rental with the specified book and member ID.',
    type: Rental,
  })
  @ApiResponse({
    status: 404,
    description: 'Rental not found.',
  })
  @Get(':bookId/:memberId')
  async findOne(
    @Param('bookId') bookId: number,
    @Param('memberId') memberId: number,
  ): Promise<Rental> {
    return await this.rentalsService.findOne(bookId, memberId);
  }

  @ApiOperation({ summary: 'Return a book' })
  @ApiResponse({
    status: 200,
    description: 'The book has been successfully returned.',
    type: Rental,
  })
  @ApiResponse({
    status: 404,
    description: 'Rental not found.',
  })
  @Put(':bookId/:memberId/return')
  async returnBook(
    @Param('bookId') bookId: number,
    @Param('memberId') memberId: number,
  ): Promise<Rental> {
    return await this.rentalsService.returnBook(bookId, memberId);
  }

  @Delete(':bookId/:memberId')
  @ApiOperation({ summary: 'Delete a rental by book and member ID' })
  @ApiResponse({
    status: 200,
    description: 'The rental has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Rental not found.',
  })
  async remove(
    @Param('bookId') bookId: number,
    @Param('memberId') memberId: number,
  ): Promise<void> {
    await this.rentalsService.remove(bookId, memberId);
  }
}
