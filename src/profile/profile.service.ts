import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor( private readonly prisma: PrismaService ) {}
  async create(createProfileDto: CreateProfileDto) {
    const resCreate = await this.prisma.profile.create({
      data: {
        profile: createProfileDto.profile,
        description: createProfileDto.description,
      },
    });
    return resCreate;
  }

  findAll() {
    return `This action returns all profile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
