import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from '@nestjs/class-validator';
import { ApiProperty, ApiPropertyOptional, ApiSchema } from '@nestjs/swagger';

@ApiSchema({
  name: 'CreateQuestionDto',
  description: 'Data transfer object'
})
export class CreateQuestionDto {
  @ApiProperty({
    type: String,
    example: 'Сколько звезд на небе?'
  })
  @IsString()
  @IsNotEmpty()
  question: string;

  @ApiProperty({
    type: Number,
    example: 100500,
  })
  @IsNumber()
  answer: number;

  @ApiPropertyOptional({
    type: String,
    example: 'Комментарий',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  comment?: string;

  @ApiPropertyOptional({
    type: [String],
    example: ['people', 'animals']
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
