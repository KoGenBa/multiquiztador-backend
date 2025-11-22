import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
} from '@nestjs/class-validator';

export class CreateGameDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(250)
  gameTitle?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  allowR18?: boolean;
}
