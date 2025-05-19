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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class Condition {
  @ApiProperty({
    description: '조건 타입',
    example: 'login_days',
  })
  @IsString()
  type: string;

  @ApiProperty({
    description: '조건 값',
    example: 7,
  })
  @IsNumber()
  value: number;
}

class Reward {
  @ApiProperty({
    description: '보상 타입',
    example: 'item',
  })
  @IsString()
  type: string;

  @ApiProperty({
    description: '보상 수량',
    example: 1,
  })
  @IsNumber()
  amount: number;

  @ApiPropertyOptional({
    type: Object,
    description: '보상 타입에 따라 달라지는 보상 관련 추가 정보',
    example: {
      itemCode: 'ITEM123',
      expireDate: '2025-05-19',
    },
  })
  @IsOptional()
  @IsObject()
  metadata?: RewardMetadata;
}

export class CreateEventDto {
  @ApiProperty({
    description: '이벤트 이름',
    example: '7일 연속 출석체크 이벤트',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: '이벤트 설명',
    example: '7일 연속 출석체크를 완료하면 보상을 드립니다.',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: '이벤트 시작일',
    example: '2025-05-01T00:00:00Z',
  })
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @ApiProperty({
    description: '이벤트 종료일',
    example: '2025-05-31T23:59:59Z',
  })
  @IsDate()
  @Type(() => Date)
  endDate: Date;

  @ApiProperty({
    description: '이벤트 진행 여부',
    example: true,
  })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({
    description: '이벤트 조건',
    type: [Condition],
    example: [
      {
        type: 'login_days',
        value: 7,
      },
    ],
  })
  @IsArray()
  @Type(() => Condition)
  conditions: Condition[];

  @ApiPropertyOptional({
    description: '이벤트 보상',
    type: [Reward],
    example: [
      {
        type: 'item',
        amount: 1,
        metadata: {
          itemCode: 'ITEM123',
          expireDate: '2026-06-01',
        },
      },
    ],
  })
  @IsArray()
  @IsOptional()
  @Type(() => Reward)
  rewards?: Reward[];
}
