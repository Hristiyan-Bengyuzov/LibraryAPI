import {
  Entity,
  Column,
  ManyToOne,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Book } from 'src/books/entities/book.entity';
import { Member } from 'src/members/entities/member.entity';

@Entity()
export class Rental {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Member, (member) => member.rentals, { onDelete: 'CASCADE' })
  member: Member;

  @ManyToOne(() => Book, (book) => book.rentals, { onDelete: 'CASCADE' })
  book: Book;

  @CreateDateColumn()
  rentedAt: Date;

  @Column({ nullable: true })
  returnedAt: Date | null;
}
