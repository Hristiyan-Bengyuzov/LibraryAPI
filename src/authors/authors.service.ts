import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './entities/author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private authorsRepository: Repository<Author>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const author = this.authorsRepository.create(createAuthorDto);
    return await this.authorsRepository.save(author);
  }

  async findAll(): Promise<Author[]> {
    return await this.authorsRepository.find({ relations: ['books'] });
  }

  async findOne(id: number): Promise<Author> {
    return await this.authorsRepository.findOne({
      where: { id },
      relations: ['books'],
    });
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    await this.authorsRepository.update(id, updateAuthorDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.authorsRepository.delete(id);
  }
}
