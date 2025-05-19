import { Test, TestingModule } from '@nestjs/testing';
import { INestMicroservice } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { MongoMemoryReplSet } from 'mongodb-memory-server';
import { EventServiceModule } from '../src/event-service.module';
import { firstValueFrom } from 'rxjs';
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
    await mongoose.connection.createCollection('events');
    await mongoose.connection.createCollection('rewards');

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [EventServiceModule],
    }).compile();

    app = moduleFixture.createNestMicroservice({
      transport: Transport.TCP,
      options: { host: '127.0.0.1', port: 9002 },
    });

    await app.listen();

    client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: { host: '127.0.0.1', port: 9002 },
    });

    await client.connect();
  });

  afterAll(async () => {
    if (mongoServer) await mongoServer.stop();
    await client.close();
    await app.close();
  });

  let createdEventId: string;

  it('should create an event', async () => {
    const dto = {
      title: 'Test Event',
      description: 'Event description',
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
      isActive: true,
      conditions: [{ type: 'login_days', value: 3 }],
      rewards: [
        {
          type: 'point',
          amount: 1000,
          metadata: { note: '3일 연속 출석 이벤트 기념 제공' },
        },
      ],
    };

    const response = await firstValueFrom(client.send('create_event', dto));

    expect(response).toHaveProperty('id');
    expect(response).toHaveProperty('title', 'Test Event');
    expect(response).toHaveProperty('description', 'Event description');

    createdEventId = response.id;
  });

  it('should get event by id with rewards', async () => {
    const response = await firstValueFrom(
      client.send('get_event_by_id', createdEventId),
    );

    expect(response).toHaveProperty('id', createdEventId);
    expect(response).toHaveProperty('rewards');
    expect(Array.isArray(response.rewards)).toBe(true);
  });

  it('should return 404 error when getting non-existent event by id', async () => {
    const nonExistentEventId = '000000000000000000000000';

    try {
      await firstValueFrom(client.send('get_event_by_id', nonExistentEventId));
      fail('Expected RpcException was not thrown');
    } catch (e: any) {
      expect(e.status).toBe(404);
      expect(e.message).toBe('이벤트를 찾을 수 없습니다.');
    }
  });

  it('should get paginated list of events', async () => {
    const response = await firstValueFrom(
      client.send('get_event_list', { offset: 0, limit: 10 }),
    );
    expect(response).toHaveProperty('items');
    expect(Array.isArray(response.items)).toBe(true);
    expect(response).toHaveProperty('meta');
    expect(response.meta).toHaveProperty('totalItemCount');
  });

  let createdRewardId: string;

  it('should create a reward for an event', async () => {
    const dto = {
      type: 'coupon',
      amount: 2,
      metadata: { code: 'COUPON2025', validUntil: '2025-12-31' },
    };

    const response = await firstValueFrom(
      client.send('create_reward', {
        eventId: createdEventId,
        dto,
      }),
    );

    expect(response).toHaveProperty('id');
    expect(response).toHaveProperty('eventId', createdEventId);
    expect(response).toHaveProperty('type', 'coupon');
    expect(response).toHaveProperty('amount', 2);
    createdRewardId = response.id;
  });

  it('should get reward by id including event info', async () => {
    const response = await firstValueFrom(
      client.send('get_reward_by_id', createdRewardId),
    );

    expect(response).toHaveProperty('id', createdRewardId);
    expect(response).toHaveProperty('event');
    expect(response.event).toHaveProperty('id', createdEventId);
  });

  it('should return 404 error when getting non-existent reward', async () => {
    const nonExistentRewardId = '000000000000000000000000';
    try {
      await firstValueFrom(
        client.send('get_reward_by_id', nonExistentRewardId),
      );
      fail('Expected RpcException was not thrown');
    } catch (e: any) {
      expect(e.statusCode).toBe(404);
      expect(e.message).toBe('해당 보상 정보를 불러올 수 없습니다.');
    }
  });

  const userId = new mongoose.Types.ObjectId().toHexString();
  let createdRewardRequestId: string;

  it('should create a reward request (SUCCESS or PENDING)', async () => {
    const response = await firstValueFrom(
      client.send('create_reward_request', {
        eventId: createdEventId,
        userId,
      }),
    );

    expect(response).toHaveProperty('id');
    expect(response).toHaveProperty('eventId', createdEventId);
    expect(response).toHaveProperty('userId', userId);
    expect(['SUCCESS', 'PENDING']).toContain(response.status);

    createdRewardRequestId = response.id;
  });

  it('should return 409 when duplicate reward request sent', async () => {
    try {
      await firstValueFrom(
        client.send('create_reward_request', {
          eventId: createdEventId,
          userId,
        }),
      );
      fail('Expected conflict error');
    } catch (e: any) {
      expect(e.status).toBe(409);
      expect(e.message).toBe('이미 해당 이벤트에 대해 보상을 요청하셨습니다.');
    }
  });

  it('should fetch reward request history for user', async () => {
    const response = await firstValueFrom(
      client.send('get_reward_request_history', {
        offset: 0,
        limit: 10,
        userId,
        role: 'USER',
      }),
    );

    expect(response).toHaveProperty('items');
    expect(Array.isArray(response.items)).toBe(true);
    expect(response).toHaveProperty('meta');
    expect(response.meta).toHaveProperty('totalItemCount');
  });

  it('should update reward request status', async () => {
    const response = await firstValueFrom(
      client.send('update_reward_request_history_status', {
        id: createdRewardRequestId,
        status: 'FAILED',
        failedReason: '조건 불충족',
      }),
    );

    expect(response).toHaveProperty('id', createdRewardRequestId);
    expect(response).toHaveProperty('status', 'FAILED');
    expect(response).toHaveProperty('failedReason', '조건 불충족');
  });

  it('should return 404 when updating non-existent reward request', async () => {
    try {
      await firstValueFrom(
        client.send('update_reward_request_history_status', {
          id: '000000000000000000000000',
          status: 'FAILED',
          failedReason: '조건 불충족',
        }),
      );
      fail('Expected RpcException was not thrown');
    } catch (e: any) {
      expect(e.status).toBe(404);
      expect(e.message).toBe('해당 보상 요청 내역을 찾을 수 없습니다.');
    }
  });
});
