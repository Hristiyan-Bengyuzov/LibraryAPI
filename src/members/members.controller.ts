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
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';

@ApiTags('members')
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new member' })
  @ApiResponse({
    status: 201,
    description: 'The member has been successfully created.',
    type: Member,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input.',
  })
  async create(@Body() createMemberDto: CreateMemberDto): Promise<Member> {
    return this.membersService.create(createMemberDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all members' })
  @ApiResponse({
    status: 200,
    description: 'Returns all members.',
    type: [Member],
  })
  async findAll(): Promise<Member[]> {
    return this.membersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a member by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the member with the specified ID.',
    type: Member,
  })
  @ApiResponse({
    status: 404,
    description: 'Member not found.',
  })
  async findOne(@Param('id') id: number): Promise<Member> {
    const member = await this.membersService.findOne(id);
    if (!member) {
      throw new NotFoundException(`Member with ID ${id} not found`);
    }
    return member;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a member by ID' })
  @ApiResponse({
    status: 200,
    description: 'The member has been successfully updated.',
    type: Member,
  })
  @ApiResponse({
    status: 404,
    description: 'Member not found.',
  })
  async update(
    @Param('id') id: number,
    @Body() updateMemberDto: UpdateMemberDto,
  ): Promise<Member> {
    const member = await this.membersService.update(id, updateMemberDto);
    if (!member) {
      throw new NotFoundException(`Member with ID ${id} not found`);
    }
    return member;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a member by ID' })
  @ApiResponse({
    status: 200,
    description: 'The member has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Member not found.',
  })
  async remove(@Param('id') id: number): Promise<void> {
    if (!(await this.membersService.findOne(id))) {
      throw new NotFoundException(`Member with ID ${id} not found`);
    }
    await this.membersService.remove(id);
  }
}
