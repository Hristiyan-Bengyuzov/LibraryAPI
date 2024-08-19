import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Genre } from 'src/genres/entities/genre.entity';
import { Author } from 'src/authors/entities/author.entity';
import { Rental } from 'src/rentals/entities/rental.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => Genre, (genre) => genre.books, { onDelete: 'CASCADE' })
  genre: Genre;

  @ManyToOne(() => Author, (author) => author.books, { onDelete: 'CASCADE' })
  author: Author;

  @OneToMany(() => Rental, (rental) => rental.book)
  rentals: Rental[];
}
