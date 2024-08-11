import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { GenresService } from 'src/genres/genres.service';
import { AuthorsService } from 'src/authors/authors.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    private readonly genreService: GenresService,
    private readonly authorService: AuthorsService,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const { title, genreId, authorId } = createBookDto;

    const genre = await this.genreService.findOne(genreId);
    if (!genre) {
      throw new NotFoundException(`Genre with ID ${genreId} not found`);
    }

    const author = await this.authorService.findOne(authorId);
    if (!author) {
      throw new NotFoundException(`Author with ID ${genreId} not found`);
    }

    const book = this.bookRepository.create({ title, genre, author });
    return await this.bookRepository.save(book);
  }

  async findAll(): Promise<Book[]> {
    return await this.bookRepository.find({ relations: ['genre', 'author'] });
  }

  async findOne(id: number): Promise<Book> {
    return await this.bookRepository.findOne({
      where: { id },
      relations: ['genre', 'author'],
    });
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const { title, genreId, authorId } = updateBookDto;

    const genre = await this.genreService.findOne(genreId);
    if (!genre) {
      throw new NotFoundException(`Genre with ID ${genreId} not found`);
    }

    const author = await this.authorService.findOne(authorId);
    if (!author) {
      throw new NotFoundException(`Author with ID ${genreId} not found`);
    }

    await this.bookRepository.update(id, { title, genre, author });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.bookRepository.delete(id);
  }
}
