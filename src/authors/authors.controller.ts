import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Author } from './entities/author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorsService } from './authors.service';

@ApiTags('authors')
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new author' })
  @ApiResponse({
    status: 201,
    description: 'The author has been successfully created.',
    type: Author,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input.',
  })
  async create(@Body() createAuthorDto: CreateAuthorDto): Promise<Author> {
    return this.authorsService.create(createAuthorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all authors' })
  @ApiResponse({
    status: 200,
    description: 'Returns all authors.',
    type: [Author],
  })
  async findAll(): Promise<Author[]> {
    return this.authorsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an author by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the author with the specified ID.',
    type: Author,
  })
  @ApiResponse({
    status: 404,
    description: 'Author not found.',
  })
  async findOne(@Param('id') id: number): Promise<Author> {
    const author = await this.authorsService.findOne(id);
    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    return author;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an author by ID' })
  @ApiResponse({
    status: 200,
    description: 'The author has been successfully updated.',
    type: Author,
  })
  @ApiResponse({
    status: 404,
    description: 'Author not found.',
  })
  async update(
    @Param('id') id: number,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ): Promise<Author> {
    const author = await this.authorsService.update(id, updateAuthorDto);
    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    return author;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an author by ID' })
  @ApiResponse({
    status: 200,
    description: 'The author has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Author not found.',
  })
  async remove(@Param('id') id: number): Promise<void> {
    if (!(await this.authorsService.findOne(id))) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    await this.authorsService.remove(id);
  }
}
