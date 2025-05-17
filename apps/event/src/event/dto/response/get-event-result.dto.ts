import { Types } from 'mongoose';

class Condition {
  type: string;
  value: number;
}

export class GetEventResultDto {
  id: Types.ObjectId;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  conditions: Condition[];
  createdAt: Date;

  constructor(event: {
    _id: Types.ObjectId;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
    conditions: Condition[];
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
    this.createdAt = event.createdAt;
  }
}
