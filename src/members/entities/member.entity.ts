import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Rental } from 'src/rentals/entities/rental.entity';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  age: number;

  @OneToMany(() => Rental, (rental) => rental.member)
  rentals: Rental[];
}
