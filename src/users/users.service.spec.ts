import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  const mockUserRepository = {
    findOneBy: jest.fn().mockImplementation(({ email }) => ({
      email,
    })),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: mockUserRepository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('finds and returns user by email', async () => {
      const result = await service.findOne('johndoe@gmail.com');

      expect(result).toEqual({
        email: 'johndoe@gmail.com',
      });
      expect(mockUserRepository.findOneBy).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({
        email: 'johndoe@gmail.com',
      });
    });
  });
});
