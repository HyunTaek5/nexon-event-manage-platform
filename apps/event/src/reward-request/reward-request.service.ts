import { Injectable } from '@nestjs/common';
import { RewardRequestRepository } from './reward-request.repository';
import { RewardRequest } from './schema/reward-request.schema';
import { Types } from 'mongoose';
import { RequestStatus } from '@app/common/enum/request-status.enum';
import { EventService } from '../event/event.service';
import { RpcException } from '@nestjs/microservices';
import { UserRole } from '@app/common/enum/role.enum';
import { getEndOfDay, getStartOfDay } from '@app/common/utils/get-time-date';

@Injectable()
export class RewardRequestService {
  constructor(
    private readonly repository: RewardRequestRepository,
    private readonly eventService: EventService,
  ) {}

  async findAllWithPagination(
    offset: number,
    limit: number,
    userId: string,
    role: UserRole,
    filterOptions?: {
      status?: RequestStatus;
      eventId?: string;
      requestDate?: Date;
    },
  ) {
    const userFilterOption =
      role === UserRole.USER ? { userId: new Types.ObjectId(userId) } : {};

    const requestDateFilterOption = filterOptions?.requestDate
      ? {
          requestedAt: {
            $gte: getStartOfDay(filterOptions.requestDate),
            $lte: getEndOfDay(filterOptions.requestDate),
          },
        }
      : {};

    const paginatedItems = await this.repository.findAllWithPagination(
      offset,
      limit,
      {
        ...filterOptions,
        ...userFilterOption,
        ...requestDateFilterOption,
      },
    );

    return paginatedItems;
  }

  async updateRewardRequestStatus(
    id: string,
    status: RequestStatus,
    failedReason?: string,
  ) {
    const rewardRequestId = new Types.ObjectId(id);

    const rewardRequest = await this.repository.findOneOrNull({
      _id: rewardRequestId,
    });

    if (!rewardRequest) {
      throw new RpcException({
        status: 404,
        message: '해당 보상 요청 내역을 찾을 수 없습니다.',
      });
    }

    await this.repository.updateOne(rewardRequestId, {
      status,
      failedReason,
    });

    const updatedRewardRequest = await this.repository.findOneOrNull({
      _id: rewardRequestId,
    });

    return updatedRewardRequest;
  }

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

    const conditionsMet = await this.evaluateConditions(
      userId,
      event.conditions,
    );

    const status = conditionsMet
      ? RequestStatus.SUCCESS
      : RequestStatus.PENDING;

    const rewardSnapshot = event.rewards.map((reward) => ({
      type: reward.type,
      amount: reward.amount,
      metadata: reward?.metadata,
    }));

    const newRequest = await this.repository.create({
      userId: userObjectId,
      eventId: eventObjectId,
      status,
      rewardSnapshot,
      requestedAt: new Date(),
    });

    return newRequest;
  }

  private async evaluateConditions(
    userId: string,
    conditions: {
      type: string;
      value: number;
    }[],
  ): Promise<boolean> {
    for (const condition of conditions) {
      const passed = await this.evaluateSingleCondition(userId, condition);

      if (!passed) {
        return false;
      }
    }

    return true;
  }

  private async evaluateSingleCondition(
    userId: string,
    condition: {
      type: string;
      value: number;
    },
  ): Promise<boolean> {
    switch (condition.type) {
      case 'login_days':
        // mock random user login data
        const loginDays = Math.floor(Math.random() * 7);
        return loginDays >= condition.value;

      case 'invite_friends':
        // mock random user invite data
        const invites = Math.floor(Math.random() * 5);
        return invites >= condition.value;

      default:
        return false;
    }
  }
}
