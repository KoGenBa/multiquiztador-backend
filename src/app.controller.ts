import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): object {
    return {
      time: new Date().toISOString(),
      appname: process.env.npm_package_name,
      appversion: process.env.npm_package_version,
    };
  }
}
