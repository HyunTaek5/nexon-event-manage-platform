class Condition {
  type: string;
  value: number;
}

class Reward {
  type: string;
  amount: number;
}

export class CreateEventDto {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  conditions: Condition[];
  rewards?: Reward[];
}
