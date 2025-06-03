import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from '@nestjs/class-validator';

export class CreateGameDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(250)
  gameTitle?: string;
}
