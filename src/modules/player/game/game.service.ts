import { Injectable, Logger } from '@nestjs/common';
import { UserAnswerDto } from './dto';

@Injectable()
export class GameService {
  private readonly logger = new Logger(GameService.name);

  public async processUserAnswer(userAnswer: UserAnswerDto, userId: string) {}
}
