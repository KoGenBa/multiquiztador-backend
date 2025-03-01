import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from './lib/config';
import { AdminModule } from './modules/admin';
import { PlayerModule } from './modules/player';
import { DatabaseModule } from './lib/database/database.module';

@Module({
  imports: [ConfigModule, DatabaseModule, AdminModule, PlayerModule],
  controllers: [AppController],
})
export class AppModule {}
