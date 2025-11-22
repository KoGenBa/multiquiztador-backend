import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionDto } from './create-question.dto';
import { ApiSchema } from '@nestjs/swagger';

@ApiSchema()
export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {}
