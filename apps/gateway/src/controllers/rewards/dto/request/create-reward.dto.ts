import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { RewardMetadata } from '@app/common/metadata/reward-metadata.type';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRewardDto {
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

  @IsOptional()
  @IsObject()
  @ApiPropertyOptional({
    type: Object,
    description: '보상 타입에 따라 달라지는 보상 관련 추가 정보',
    example: {
      itemCode: 'ITEM123',
      expireDate: '2025-05-21',
    },
  })
  metadata?: RewardMetadata;
}
