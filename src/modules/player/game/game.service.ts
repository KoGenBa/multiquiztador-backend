import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UserAnswerDto } from './dto';
import { Repository } from 'typeorm';
import { Game, Player, PlayerAnswer, Question } from 'src/lib/database/entities';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GameService {
  private readonly logger = new Logger(GameService.name);

  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
    @InjectRepository(PlayerAnswer)
    private readonly playerAnswerRepository: Repository<PlayerAnswer>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  public async processUserAnswer(userAnswer: UserAnswerDto, userId: string) {}
}
