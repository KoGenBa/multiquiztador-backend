import { Module } from '@nestjs/common';
import { ConfigModule as AppConfigModule } from '@nestjs/config';
import { ConfigService } from './config.service';

@Module({
  imports: [AppConfigModule.forRoot()],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
