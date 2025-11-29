import { IsNotEmpty, IsOptional, IsString } from "@nestjs/class-validator";

export class PlayerJoinDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name?: string;
}
