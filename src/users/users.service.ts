import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUseDto } from 'src/auth/dto/create-user.dto';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({
      username,
    });
  }

  async checkPassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(user.password, password);
  }

  async create(createUserDto: CreateUseDto) {
    const user = this.usersRepository.create(createUserDto);

    try {
      await this.usersRepository.save(user);
    } catch (error) {
      throw new BadRequestException('Username already existed');
    }

    return user;
  }
}
