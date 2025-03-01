import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question, Tag } from 'src/lib/database/entities';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Tag])],
  controllers: [QuestionController],
  providers: [QuestionService],
  exports: [QuestionService],
})
export class QuestionModule {}
