import { Injectable } from '@nestjs/common';
import { RewardRequestRepository } from './reward-request.repository';
import { RewardRequest } from './schema/reward-request.schema';
import { Types } from 'mongoose';
import { RequestStatus } from '@app/common/enum/request-status.enum';
import { EventService } from '../event/event.service';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class RewardRequestService {
  constructor(
    private readonly repository: RewardRequestRepository,
    private readonly eventService: EventService,
  ) {}

  async createRewardRequest(
    eventId: string,
    userId: string,
  ): Promise<RewardRequest> {
    const eventObjectId = new Types.ObjectId(eventId);
    const userObjectId = new Types.ObjectId(userId);

    const existing = await this.repository.findOneOrNull({
      userId: userObjectId,
      eventId: eventObjectId,
      status: { $in: [RequestStatus.PENDING, RequestStatus.SUCCESS] },
    });

    if (existing) {
      throw new RpcException({
        status: 409,
        message: '이미 해당 이벤트에 대해 보상을 요청하셨습니다.',
      });
    }

    const event = await this.eventService.findOneByIdWithRewards(eventId);

    // TODO: 보상을 요청한 유저의 이벤트 조건 충족 여부 체크 로직 구현 필요
    const conditionsMet = true;

    const status = conditionsMet ? RequestStatus.SUCCESS : RequestStatus.FAILED;
    const failedReason = conditionsMet
      ? undefined
      : '이벤트 조건을 충족하지 못했습니다.';

    const rewardSnapshot = event.rewards.map((reward) => ({
      type: reward.type,
      amount: reward.amount,
      metadata: reward?.metadata,
    }));

    const newRequest = await this.repository.create({
      userId: userObjectId,
      eventId: eventObjectId,
      status,
      failedReason,
      rewardSnapshot,
      requestedAt: new Date(),
    });

    return newRequest;
  }
}
