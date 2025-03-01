import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from '@nestjs/class-validator';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsNumber()
  answer: number;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
