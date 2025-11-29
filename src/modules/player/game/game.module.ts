import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { GameGateway } from './game.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game, Player, PlayerAnswer, Question } from 'src/lib/database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Game, Player, PlayerAnswer, Question])],
  controllers: [GameController],
  providers: [GameGateway, GameService],
})
export class GameModule {}
