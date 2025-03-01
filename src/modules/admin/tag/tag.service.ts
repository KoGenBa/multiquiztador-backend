import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from 'src/lib/database/entities';
import { CreateTagDto, UpdateTagDto } from './dto';

@Injectable()
export class TagService {
  private readonly logger = new Logger(TagService.name);

  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async create(dto: CreateTagDto): Promise<Tag> {
    try {
      const tag = this.tagRepository.create(dto);
      await this.tagRepository.save(tag);
      return tag;
    } catch (error) {
      if (error.message?.includes('duplicate key')) {
        throw new HttpException(
          `Key "${dto.key}" already exists!`,
          HttpStatus.CONFLICT,
        );
      }
      throw error;
    }
  }

  async findAll(): Promise<Tag[]> {
    try {
      const tags = await this.tagRepository.find();
      return tags;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async findOne(id: number): Promise<Tag> {
    try {
      const tag = await this.tagRepository.findOneBy({ id });
      return tag;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async update(id: number, dto: UpdateTagDto): Promise<Tag> {
    try {
      const tag = await this.tagRepository.findOneBy({ id });
      for (const key in dto) {
        tag[key] = dto[key];
      }
      await this.tagRepository.save(tag);
      return tag;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async remove(id: number): Promise<Tag> {
    try {
      const tag = await this.tagRepository.findOneBy({ id });
      await this.tagRepository.delete(tag);
      return tag;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
