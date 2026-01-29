import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getMockPlayerAnswers, generateMockQuestions, generateMockPlayers } from 'src/lib/const';
import { Game, Player, PlayerAnswer, Question } from 'src/lib/database/entities';
import { EPlayerTitles, IGamePlayerStats } from 'src/lib/type';
import { CreateGameDto, UpdateGameDto } from './dto';

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
    const playerAnswers = await this.playerAnswerRepository.find({
      where: { gameId },
    });
    const questions = await this.questionRepository.find({
      where: { games: { id: gameId } },
    });
    const players = await this.playerRepository.find({
      where: { gamesParticipated: { id: gameId } },
    });
    // const questions = generateMockQuestions(10);
    // const players = generateMockPlayers(5);
    // const playerAnswers = getMockPlayerAnswers(gameId, questions, players);

    const playerScores: Record<string, IGamePlayerStats> = Object.fromEntries(
      players.map(
        (player) => [
          player.id,
          {
            id: player.id,
            displayName: player.displayName,
            questions: [],
            score: 0,
            totalDelta: 0,
            titles: [],
          },
        ],
      )
    );
    const maxScore = Math.max(players.length - 1, 1);
    for (const question of questions) {
      const questionAnswers = playerAnswers.filter(({ questionId }) => questionId === question.id);
      const maxDelta = questionAnswers.toSorted((a, b) => b.deviation - a.deviation)[0]?.deviation ?? 0;
      for (const qa of questionAnswers) {
        const player = playerScores[qa.playerId];
        player.totalDelta += qa.deviation;
        let score = maxScore;
        if (maxDelta !== 0) {
          score = Math.trunc(maxScore * ((maxDelta - qa.deviation) / maxDelta) * 10) / 10;
          if (qa.deviation / question.answer < 0.1 && !player.titles.includes(EPlayerTitles.BULLSEYE)) {
            player.titles.push(EPlayerTitles.BULLSEYE);
          }
        }
        player.questions.push({
          ...qa,
          score,
        });
        player.score += score;
      }
    }
    const results = Object.values(playerScores).toSorted((a, b) => b.score - a.score);
    const minTotalDeltaUser = Object.values(playerScores).toSorted((a, b) => a.totalDelta - b.totalDelta)[0];
    const bestAverageUser = results.find((player) => player.id === minTotalDeltaUser.id);
    if ('titles' in (bestAverageUser ?? {})) {
      bestAverageUser.titles.push(EPlayerTitles.BEST_AVERAGE);
    }
    const [goldScore, silverScore, bronzeScore] = Array.from(new Set(results.map(({ score }) => score))).toSorted((a, b) => b - a);
    results.forEach((res) => {
        if (res.score === goldScore) {
          res.titles.push(EPlayerTitles.MEDAL_GOLD);
        }
        if (res.score === silverScore) {
          res.titles.push(EPlayerTitles.MEDAL_SILVER);
        }
        if (res.score === bronzeScore) {
          res.titles.push(EPlayerTitles.MEDAL_BRONZE);
        }
      });
    return Object.values(results);
  }
}
