import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RewardRequest,
  RewardRequestSchema,
} from './schema/reward-request.schema';
import { RewardRequestRepository } from './reward-request.repository';
import { RewardRequestService } from './reward-request.service';
import { RewardRequestController } from './reward-request.controller';
import { EventModule } from '../event/event.module';

@Module({
  imports: [
    EventModule,
    MongooseModule.forFeature([
      {
        name: RewardRequest.name,
        schema: RewardRequestSchema,
      },
    ]),
  ],
  controllers: [RewardRequestController],
  providers: [RewardRequestService, RewardRequestRepository],
})
export class RewardRequestModule {}
