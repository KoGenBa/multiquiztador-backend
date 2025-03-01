import { Module } from '@nestjs/common';
import { AuthModule } from './auth';
import { GameModule } from './game';

@Module({
  imports: [AuthModule, GameModule],
  controllers: [],
  providers: [],
})
export class PlayerModule {}
