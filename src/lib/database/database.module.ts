import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './db.config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...config,
    }),
  ],
})
export class DatabaseModule {}
