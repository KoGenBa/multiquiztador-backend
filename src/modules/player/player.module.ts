import { Module } from '@nestjs/common';
import { playerRoutes } from './player.routes';

@Module({
  imports: [...playerRoutes],
  controllers: [],
  providers: [],
})
export class PlayerModule {}
