import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Genre } from 'src/genres/entities/genre.entity';
import { Author } from 'src/authors/entities/author.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => Genre, (genre) => genre.books)
  genre: Genre;

  @ManyToOne(() => Author, (author) => author.books)
  author: Author;
}
