import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private membersRepository: Repository<Member>,
  ) {}

  async create(createMemberDto: CreateMemberDto): Promise<Member> {
    const newMember = this.membersRepository.create(createMemberDto);
    return await this.membersRepository.save(newMember);
  }

  async findAll(): Promise<Member[]> {
    return await this.membersRepository.find();
  }

  async findOne(id: number): Promise<Member> {
    return await this.membersRepository.findOne({ where: { id } });
  }

  async update(id: number, updateMemberDto: UpdateMemberDto): Promise<Member> {
    await this.membersRepository.update(id, updateMemberDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.membersRepository.delete(id);
  }
}
