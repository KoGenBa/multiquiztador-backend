import { RouterModule, Routes } from '@nestjs/core';
import { DynamicModule, Type } from '@nestjs/common';
import { AuthModule } from './auth';
import { GameModule } from './game';
import { QuestionModule } from './question';
import { TagModule } from './tag';

const path = '/admin';

const modules: Array<Type<any> | DynamicModule | Promise<DynamicModule>> = [
  AuthModule,
  GameModule,
  QuestionModule,
  TagModule,
];

export const routes: Routes = modules.map((module) => ({
  path,
  module: module as Type<any>,
}));

export const adminRoutes: Array<
  Type<any> | DynamicModule | Promise<DynamicModule>
> = [...modules, RouterModule.register(routes)];
