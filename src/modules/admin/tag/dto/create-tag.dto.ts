import { IsNotEmpty, IsOptional, IsString } from '@nestjs/class-validator';

export class CreateTagDto {
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
