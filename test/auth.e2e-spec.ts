import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from './../src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let api: request.SuperTest<request.Test>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    const reflector = app.get(Reflector);
    app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

    app.setGlobalPrefix('/api');
    await app.init();
    api = request(app.getHttpServer());
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/signup (POST)', () => {
    it('create new user', async () => {
      const result = await api.post('/api/auth/signup').send({
        email: 'john_doe@gmail.com',
        password: 'secret-password',
      });

      expect(result.statusCode).toBe(201);
      expect(result.body).toEqual({
        id: expect.any(Number),
        email: 'john_doe@gmail.com',
      });
    });
  });
});
