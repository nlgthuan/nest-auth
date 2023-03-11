import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';

import { UsersService } from '../users/users.service';

import { CreateUseDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    if (user && (await this.usersService.checkPassword(user, pass))) {
      const { id, email } = user;
      return { id, email };
    }

    return null;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(createUserDto: CreateUseDto) {
    return this.usersService.create(createUserDto);
  }
}
