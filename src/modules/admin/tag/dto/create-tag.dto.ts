import { ITopic } from 'src/lib/type';
import { IsNotEmpty, IsOptional, IsString } from '@nestjs/class-validator';

export class CreateTagDto implements ITopic {
  @IsString()
  @IsNotEmpty()
  key: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;
}
