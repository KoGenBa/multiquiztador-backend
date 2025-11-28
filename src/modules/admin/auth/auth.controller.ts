import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login() {
    return;
  }

  @Post('logout')
  logout() {
    return;
  }

  @Get('currentgm')
  getCurrentUser() {
    return null;
  }
}
