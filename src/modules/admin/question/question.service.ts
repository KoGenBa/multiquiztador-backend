import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, In, Repository } from 'typeorm';
import { Question, Tag } from 'src/lib/database/entities';
import { CreateQuestionDto, UpdateQuestionDto } from './dto';

@Injectable()
export class QuestionService {
  private readonly logger = new Logger(QuestionService.name);

  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async create(dto: CreateQuestionDto): Promise<Question> {
    try {
      const { tags, ...rest } = dto;
      let question = this.questionRepository.create(rest);
      if (tags) {
        question = await this.setQuestionTags(question, tags);
      }
      await this.questionRepository.save(question);

      return question;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async findAll(): Promise<Question[]> {
    return this.questionRepository.find();
  }

  async findOne(id: number): Promise<Question> {
    return this.questionRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: UpdateQuestionDto): Promise<Question> {
    try {
      const { tags, ...rest } = dto;
      let question = await this.questionRepository.findOne({ where: { id } });
      for (const key in rest) {
        question[key] = rest[key];
      }
      if (tags) {
        question = await this.setQuestionTags(question, tags);
      }
      await this.questionRepository.save(question);

      return question;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.questionRepository.delete({ id });
  }

  private async setQuestionTags(
    question: Question,
    tags: string[],
  ): Promise<Question> {
    question.tags = await this.tagRepository.find({
      where: { key: In(tags) },
    });
    return question;
  }
}
