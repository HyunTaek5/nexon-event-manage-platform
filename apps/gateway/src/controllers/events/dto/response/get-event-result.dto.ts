class Condition {
  type: string;
  value: number;
}

export class GetEventResultDto {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  conditions: Condition[];
  createdAt: Date;
}
