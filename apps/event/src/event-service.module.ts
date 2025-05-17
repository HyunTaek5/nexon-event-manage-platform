import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { EventModule } from './event/event.module';
import { RewardModule } from './reward/reward.module';
import { RewardRequestModule } from './reward-request/reward-request.module';

@Module({
  imports: [
    EventModule,
    RewardModule,
    RewardRequestModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/event/.env',
    }),
  ],
})
export class EventServiceModule {}
