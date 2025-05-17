class Condition {
  type: string;
  value: number;
}

class Event {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  conditions: Condition[];
  createdAt: Date;
}

export class RewardDetailResultDto {
  id: string;
  eventId: string;
  type: string;
  amount: number;
  createdAt: Date;
  event: Event;
}
