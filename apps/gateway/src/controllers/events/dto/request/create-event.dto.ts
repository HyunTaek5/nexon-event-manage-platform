import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { RewardMetadata } from '@app/common/metadata/reward-metadata.type';
import { ApiPropertyOptional } from '@nestjs/swagger';

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
  @IsOptional()
  @IsObject()
  @ApiPropertyOptional({
    type: Object,
    description: '보상 타입에 따라 달라지는 보상 관련 추가 정보',
    example: {
      itemCode: 'ITEM123',
      expireDate: '2025-05-19',
    },
  })
  metadata?: RewardMetadata;
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
