class Condition {
  type: string;
  value: number;
}

class Reward {
  id: string;
  eventId: string;
  type: string;
  amount: number;
}

export class GetEventDetailResultDto {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  conditions: Condition[];
  rewards?: Reward[];
  createdAt: Date;
}
