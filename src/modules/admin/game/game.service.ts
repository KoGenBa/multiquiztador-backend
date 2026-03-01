import { BadRequestException, ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game, Player, PlayerAnswer, Question } from 'src/lib/database/entities';
import { EGameState, EPlayerTitles, IGamePlayerStats } from 'src/lib/type';
import { getQuestionCount } from 'src/lib/const';
import { CreateGameDto, StartGameDto, UpdateGameDto } from './dto';

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
  ) { }

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
    const game = await this.gameRepository.findOne({
      where: { id: gameId },
      relations: {
        players: true,
        questions: true,
        playerAnswers: true,
      },
    });
    if (!game) {
      throw new NotFoundException('Game with specified ID is not found!');
    }
    const { players, playerAnswers, questions } = game;
    if (!playerAnswers.length) {
      throw new BadRequestException('No player answers are done for this game, cannot finish it!');
    }
    if (playerAnswers.length > questions.length * players.length) {
      throw new ConflictException('Player answers number exceeds number of questions multiplied by number of players!');
    }
    if (game.gameState !== EGameState.FINISHED) {
        game.gameState = EGameState.CALCULATING;
        await this.gameRepository.save(game);
      }

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

    if (game.gameState !== EGameState.FINISHED) {
      game.gameState = EGameState.FINISHED;
      await this.gameRepository.save(game);
    }
    return Object.values(results);
  }

  public async startGame(dto: StartGameDto) {
    const game = await this.gameRepository.findOne({
      where: { id: dto.gameId },
      relations: {
        players: true,
        questions: true,
      },
    });
    if (!game) {
      throw new NotFoundException('Game with specified ID is not found!');
    }
    if (![EGameState.CREATED, EGameState.PENDING].includes(game.gameState)) {
      return game;
    }
    const players = await this.playerRepository.find({ where: { gamesParticipated: { id: dto.gameId } } });
    const questionCount = dto.questionsQuantity ?? getQuestionCount(players?.length);
    const questions = await this.questionRepository.find({
      take: questionCount,
      select: ['id', 'question'],
      // order: [],
    });
    game.questions = questions;
    game.questionsUsed = questions.length;
    game.gameState = EGameState.ACTIVE;
    await this.gameRepository.save(game);
    // Object.fromEntries(Array(16).fill(0).map((_, i) => [i, getQuestionCount(i)]));
    return game;
  }
}
