import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRentalDto } from './dto/create-rental.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rental } from './entities/rental.entity';
import { Repository } from 'typeorm';
import { BooksService } from 'src/books/books.service';
import { MembersService } from 'src/members/members.service';

@Injectable()
export class RentalsService {
  constructor(
    @InjectRepository(Rental)
    private readonly rentalRepository: Repository<Rental>,
    private readonly bookService: BooksService,
    private readonly memberService: MembersService,
  ) {}

  async create(createRentalDto: CreateRentalDto): Promise<Rental> {
    const { bookId, memberId } = createRentalDto;

    const book = await this.bookService.findOne(bookId);
    if (!book) {
      throw new NotFoundException(`Book with ID ${bookId} not found`);
    }

    const member = await this.memberService.findOne(memberId);
    if (!member) {
      throw new NotFoundException(`Member with ID ${memberId} not found`);
    }

    const rental = this.rentalRepository.create({ book, member });
    return await this.rentalRepository.save(rental);
  }

  async findAll(): Promise<Rental[]> {
    return this.rentalRepository.find({
      relations: ['book', 'member'],
    });
  }

  async findOne(bookId: number, memberId: number): Promise<Rental> {
    const rental = await this.rentalRepository.findOne({
      where: {
        book: { id: bookId },
        member: { id: memberId },
      },
      relations: ['book', 'member'],
    });

    if (!rental) {
      throw new NotFoundException(
        `Rental with Book ID ${bookId} and Member ID ${memberId} not found`,
      );
    }

    return rental;
  }

  async returnBook(bookId: number, memberId: number): Promise<Rental> {
    const rental = await this.findOne(bookId, memberId);

    if (rental.returnedAt) {
      throw new BadRequestException(
        `Book with ID ${bookId} is already returned.`,
      );
    }

    rental.returnedAt = new Date();
    return this.rentalRepository.save(rental);
  }

  async remove(bookId: number, memberId: number): Promise<void> {
    const rental = await this.findOne(bookId, memberId);
    await this.rentalRepository.remove(rental);
  }
}
