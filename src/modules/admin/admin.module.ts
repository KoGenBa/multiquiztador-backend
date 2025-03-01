import { Module } from '@nestjs/common';
import { adminRoutes } from './admin.routes';

@Module({
  imports: [...adminRoutes],
  controllers: [],
  providers: [],
})
export class AdminModule {}
