import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

class Condition {
  @IsString()
  type: string;

  @IsNumber()
  value: number;
}

class Reward {
  @IsString()
  type: string;

  @IsNumber()
  amount: number;
}

export class CreateEventDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  endDate: Date;

  @IsBoolean()
  isActive: boolean;

  @IsArray()
  @Type(() => Condition)
  conditions: Condition[];

  @IsArray()
  @IsOptional()
  @Type(() => Reward)
  rewards?: Reward[];
}
