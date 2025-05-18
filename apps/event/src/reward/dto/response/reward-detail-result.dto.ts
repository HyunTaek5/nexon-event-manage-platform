import { Types } from 'mongoose';
import { RewardMetadata } from '@app/common/metadata/reward-metadata.type';

class Event {
  id: Types.ObjectId;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  conditions: {
    type: string;
    value: number;
  }[];
  createdAt: Date;
}

export class RewardDetailResultDto {
  id: Types.ObjectId;
  eventId: string;
  type: string;
  amount: number;
  createdAt: Date;
  metadata?: RewardMetadata;
  event: Event;

  constructor(reward: {
    _id: Types.ObjectId;
    eventId: string;
    type: string;
    amount: number;
    createdAt: Date;
    metadata?: RewardMetadata;
    event: {
      _id: Types.ObjectId;
      title: string;
      description: string;
      startDate: Date;
      endDate: Date;
      isActive: boolean;
      conditions: {
        type: string;
        value: number;
      }[];
      createdAt: Date;
    };
  }) {
    this.id = reward._id;
    this.eventId = reward.eventId;
    this.type = reward.type;
    this.amount = reward.amount;
    this.createdAt = reward.createdAt;
    this.metadata = reward?.metadata;
    this.event = {
      id: reward.event._id,
      conditions: reward.event.conditions.map((condition) => ({
        type: condition.type,
        value: condition.value,
      })),
      title: reward.event.title,
      description: reward.event.description,
      startDate: reward.event.startDate,
      endDate: reward.event.endDate,
      isActive: reward.event.isActive,
      createdAt: reward.event.createdAt,
    };
  }
}
