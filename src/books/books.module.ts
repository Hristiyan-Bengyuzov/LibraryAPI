import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { GenresModule } from 'src/genres/genres.module';
import { AuthorsModule } from 'src/authors/authors.module';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), GenresModule, AuthorsModule],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
