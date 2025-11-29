import { IsInt, IsNumber, Min } from "@nestjs/class-validator";

export class UserAnswerDto {
  @Min(1)
  @IsInt()
  gameId: number;

  @Min(1)
  @IsInt()
  questionId: number;

  @IsNumber()
  answer: number;
}
