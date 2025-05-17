import { Types } from 'mongoose';

class Condition {
  type: string;
  value: number;
}

class Reward {
  id: Types.ObjectId;
  eventId: Types.ObjectId;
  type: string;
  amount: number;
}

export class GetEventDetailResultDto {
  id: Types.ObjectId;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  conditions: Condition[];
  rewards?: Reward[];
  createdAt: Date;

  constructor(event: {
    _id: Types.ObjectId;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
    conditions: Condition[];
    rewards?: {
      _id: Types.ObjectId;
      eventId: Types.ObjectId;
      type: string;
      amount: number;
    }[];
    createdAt?: Date;
  }) {
    this.id = event._id;
    this.title = event.title;
    this.description = event.description;
    this.startDate = event.startDate;
    this.endDate = event.endDate;
    this.isActive = event.isActive;
    this.conditions = event.conditions.map((condition) => {
      return {
        type: condition.type,
        value: condition.value,
      };
    });
    this.rewards = event?.rewards?.map((reward) => {
      return {
        id: reward._id,
        eventId: reward.eventId,
        type: reward.type,
        amount: reward.amount,
      };
    });
    this.createdAt = event.createdAt;
  }
}
