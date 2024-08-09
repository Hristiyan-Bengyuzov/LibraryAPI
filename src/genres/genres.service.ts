import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from './entities/genre.entity';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  async create(createGenreDto: CreateGenreDto): Promise<Genre> {
    const genre = this.genreRepository.create(createGenreDto);
    return await this.genreRepository.save(genre);
  }

  async findAll(): Promise<Genre[]> {
    return await this.genreRepository.find();
  }

  async findOne(id: number): Promise<Genre> {
    return await this.genreRepository.findOneBy({ id });
  }

  async update(id: number, updateGenreDto: UpdateGenreDto): Promise<Genre> {
    await this.genreRepository.update(id, updateGenreDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.genreRepository.delete(id);
  }
}
