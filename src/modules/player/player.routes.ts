import { RouterModule, Routes } from '@nestjs/core';
import { DynamicModule, Type } from '@nestjs/common';
import { AuthModule } from './auth';
import { GameModule } from './game';

const path = '/player';

const modules: Array<Type<any> | DynamicModule | Promise<DynamicModule>> = [
  AuthModule,
  GameModule,
];

export const routes: Routes = modules.map((module) => ({
  path,
  module: module as Type<any>,
}));

export const playerRoutes: Array<
  Type<any> | DynamicModule | Promise<DynamicModule>
> = [...modules, RouterModule.register(routes)];
