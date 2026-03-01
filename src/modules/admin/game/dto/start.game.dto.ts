import { IsNumber, IsOptional, Min } from "@nestjs/class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class StartGameDto {
  @ApiProperty()
  @IsNumber()
  @Min(1)
  gameId: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(1)
  questionsQuantity?: number;
}
