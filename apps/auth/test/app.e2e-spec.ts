import { Test, TestingModule } from '@nestjs/testing';
import { INestMicroservice } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { AuthServiceModule } from '../src/auth-service.module';
import { firstValueFrom } from 'rxjs';
import { MongoMemoryReplSet } from 'mongodb-memory-server';
import mongoose from 'mongoose';

jest.setTimeout(30000);

describe('Auth Microservice (e2e)', () => {
  let mongoServer: MongoMemoryReplSet;

  let app: INestMicroservice;
  let client: ClientProxy;

  beforeAll(async () => {
    mongoServer = await MongoMemoryReplSet.create({
      replSet: { count: 1, storageEngine: 'wiredTiger' },
    });
    process.env.MONGODB_URI = mongoServer.getUri();

    await mongoose.connect(process.env.MONGODB_URI!);
    await mongoose.connection.createCollection('users');

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthServiceModule],
    }).compile();

    app = moduleFixture.createNestMicroservice({
      transport: Transport.TCP,
      options: { host: '127.0.0.1', port: 9001 },
    });

    await app.listen();

    client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: { host: '127.0.0.1', port: 9001 },
    });

    await client.connect();
  });

  afterAll(async () => {
    if (mongoServer) await mongoServer.stop();
    await client.close();
    await app.close();
  });

  let userId: string;

  it('should register a new user', async () => {
    const response = await firstValueFrom(
      client.send('join_user', {
        email: 'test@example.com',
        password: '1234',
        firstName: 'Test',
        lastName: 'User',
        nickname: 'tester',
      }),
    );

    expect(response).toHaveProperty('id');
    expect(response).toHaveProperty('email', 'test@example.com');
    userId = response.id;
  });

  it('should fail to register a user with existing email', async () => {
    try {
      await firstValueFrom(
        client.send('join_user', {
          email: 'test@example.com',
          password: '1234',
          firstName: 'Test',
          lastName: 'User',
          nickname: 'tester',
        }),
      );
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toContain('이미 존재하는 이메일입니다.');
    }
  });

  it('should fail to register a user with existing nickname', async () => {
    try {
      await firstValueFrom(
        client.send('join_user', {
          email: 'test1@example.com',
          password: '1234',
          firstName: 'Test',
          lastName: 'User',
          nickname: 'tester',
        }),
      );
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toContain('이미 존재하는 닉네임입니다.');
    }
  });

  it('should login a user', async () => {
    const response = await firstValueFrom(
      client.send('login_user', {
        email: 'test@example.com',
        password: '1234',
      }),
    );

    expect(response).toHaveProperty('accessToken');
    expect(response).toHaveProperty('refreshToken');
  });

  it('should validate user', async () => {
    const response = await firstValueFrom(
      client.send('valid_user', {
        userId,
      }),
    );

    expect(response).toHaveProperty('id', userId);
    expect(response).toHaveProperty('email', 'test@example.com');
  });

  it('should patch user role', async () => {
    const response = await firstValueFrom(
      client.send('patch_user_role', {
        id: userId,
        role: 'ADMIN',
      }),
    );

    expect(response).toHaveProperty('id', userId);
    expect(response).toHaveProperty('role', 'ADMIN');
  });
});
