import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateUseDto } from './dto/create-user.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('/signup')
  async signUp(@Body() createUserDto: CreateUseDto) {
    return this.authService.signUp(createUserDto);
  }
}
