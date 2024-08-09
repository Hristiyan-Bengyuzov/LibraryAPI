import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre.entity';

@ApiTags('genres')
@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new genre' })
  @ApiResponse({
    status: 201,
    description: 'The genre has been successfully created.',
    type: Genre,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input.',
  })
  async create(@Body() createGenreDto: CreateGenreDto): Promise<Genre> {
    return this.genresService.create(createGenreDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all genres' })
  @ApiResponse({
    status: 200,
    description: 'Returns all genres.',
    type: [Genre],
  })
  async findAll(): Promise<Genre[]> {
    return this.genresService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a genre by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the genre with the specified ID.',
    type: Genre,
  })
  @ApiResponse({
    status: 404,
    description: 'Genre not found.',
  })
  async findOne(@Param('id') id: number): Promise<Genre> {
    const genre = await this.genresService.findOne(id);
    if (!genre) {
      throw new NotFoundException(`Genre with ID ${id} not found`);
    }
    return genre;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a genre by ID' })
  @ApiResponse({
    status: 200,
    description: 'The genre has been successfully updated.',
    type: Genre,
  })
  @ApiResponse({
    status: 404,
    description: 'Genre not found.',
  })
  async update(
    @Param('id') id: number,
    @Body() updateGenreDto: UpdateGenreDto,
  ): Promise<Genre> {
    const genre = await this.genresService.update(id, updateGenreDto);
    if (!genre) {
      throw new NotFoundException(`Genre with ID ${id} not found`);
    }
    return genre;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a genre by ID' })
  @ApiResponse({
    status: 200,
    description: 'The genre has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Genre not found.',
  })
  async remove(@Param('id') id: number): Promise<void> {
    if (!(await this.genresService.findOne(id))) {
      throw new NotFoundException(`Genre with ID ${id} not found`);
    }
    await this.genresService.remove(id);
  }
}
