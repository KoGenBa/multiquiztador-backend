import { IsNumber, Min } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FinishGameDto {
  @ApiProperty()
  @IsNumber()
  @Min(1)
  gameId: number;
}
