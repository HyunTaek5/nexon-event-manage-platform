import { Injectable } from '@nestjs/common';
import { EventRepository } from './event.repository';
import { CreateEventDto } from './dto/request/create-event.dto';
import { RewardService } from '../reward/reward.service';
import { RpcException } from '@nestjs/microservices';
import { Event } from './schema/event.schema';
import { Paginated } from '@app/common/pagination/paginated';

@Injectable()
export class EventService {
  constructor(
    private readonly repository: EventRepository,
    private readonly rewardService: RewardService,
  ) {}

  async findOneByIdWithRewards(id: string) {
    const event = await this.repository.findOneWithRewards(id);

    if (!event) {
      throw new RpcException({
        status: 404,
        message: '이벤트를 찾을 수 없습니다.',
      });
    }

    return event;
  }

  async findAllWithPagination(
    offset: number,
    limit: number,
  ): Promise<Paginated<Event>> {
    return this.repository.findAllWithPagination(offset, limit);
  }

  async createEvent(dto: CreateEventDto) {
    const session = await this.repository.startTransaction();
    const {
      title,
      description,
      startDate,
      endDate,
      isActive,
      conditions,
      rewards,
    } = dto;

    try {
      const event = await this.repository.create(
        {
          title,
          description,
          startDate,
          endDate,
          isActive,
          conditions,
        },
        {
          session: session,
        },
      );

      if (!rewards) {
        await session.commitTransaction();
        return { event };
      }

      const createdRewards = await this.rewardService.createRewards(
        event._id,
        rewards,
        {
          session: session,
        },
      );

      await session.commitTransaction();

      return { event, createdRewards };
    } catch (e) {
      await session.abortTransaction();
      throw e;
    } finally {
      await session.endSession();
    }
  }
}
