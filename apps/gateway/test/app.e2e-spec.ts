import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, VersioningType } from '@nestjs/common';
import { GatewayModule } from '../src/gateway.module';
import * as request from 'supertest';

describe('Gateway Controller (e2e)', () => {
  let gatewayApp: INestApplication;

  beforeAll(async () => {
    const gatewayModule: TestingModule = await Test.createTestingModule({
      imports: [GatewayModule],
    }).compile();

    gatewayApp = gatewayModule.createNestApplication();

    gatewayApp.enableVersioning({
      type: VersioningType.URI,
    });

    await gatewayApp.init();
    await gatewayApp.listen(9000);
  });

  afterAll(async () => {
    await gatewayApp.close();
  });

  it('should return 200 OK when accessing unprotected route', async () => {
    const res = await request(gatewayApp.getHttpServer()).get('/v1/events');
    expect(res.status).toBe(200);
  });

  it('should return 401 Unauthorized when accessing protected route without token', async () => {
    const res = await request(gatewayApp.getHttpServer()).post('/v1/events');
    expect(res.status).toBe(401);
  });
});
