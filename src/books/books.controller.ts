import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './entities/book.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateBookDto } from './dto/update-book.dto';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new book' })
  @ApiResponse({
    status: 201,
    description: 'The book has been successfully created.',
    type: Book,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input.',
  })
  async create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.booksService.create(createBookDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all books' })
  @ApiResponse({
    status: 200,
    description: 'Returns all books.',
    type: [Book],
  })
  async findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a book by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the book with the specified ID.',
    type: Book,
  })
  @ApiResponse({
    status: 404,
    description: 'Book not found.',
  })
  async findOne(@Param('id') id: number): Promise<Book> {
    const book = await this.booksService.findOne(id);
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a book by ID' })
  @ApiResponse({
    status: 200,
    description: 'The book has been successfully updated.',
    type: Book,
  })
  @ApiResponse({
    status: 404,
    description: 'Book not found.',
  })
  async update(
    @Param('id') id: number,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    const book = await this.booksService.update(id, updateBookDto);
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a book by ID' })
  @ApiResponse({
    status: 200,
    description: 'The book has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Book not found.',
  })
  async remove(@Param('id') id: number): Promise<void> {
    if (!(await this.booksService.findOne(id))) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    await this.booksService.remove(id);
  }
}
