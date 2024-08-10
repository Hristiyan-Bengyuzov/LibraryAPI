import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Book } from 'src/books/entities/book.entity';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Book, (book) => book.genre)
  books: Book[];
}
