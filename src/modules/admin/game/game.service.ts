import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game, Player, PlayerAnswer, Question } from 'src/lib/database/entities';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { mockPlayers, mockQuestions, getMockPlayerAnswers } from 'src/lib/const'

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

  async create(dto: CreateGameDto) {
    const game = this.gameRepository.create(dto);
    await this.gameRepository.save(game);
    return game;
  }

  findAll() {
    return `This action returns all game`;
  }

  findOne(id: number) {
    return `This action returns a #${id} game`;
  }

  update(id: number, dto: UpdateGameDto) {
    return `This action updates a #${id} game`;
  }

  remove(id: number) {
    return `This action removes a #${id} game`;
  }

  public async calculateGame(gameId: number) {
    try {
      const game = await this.gameRepository.findOneByOrFail({ id: gameId });
    } catch (error) {
      this.logger.error(error);
      throw new NotFoundException('Game with specified ID not found');
    }
    // const playerAnswers = await this.playerAnswerRepository.find({
    //   where: { gameId },
    // });
    // const questions = await this.questionRepository.find({
    //   where: { games: { id: gameId } },
    // });
    const questions = mockQuestions;
    const players = mockPlayers;
    const playerAnswers = getMockPlayerAnswers(gameId, mockQuestions, mockPlayers);

    return { questions, players, playerAnswers };
  }
}
