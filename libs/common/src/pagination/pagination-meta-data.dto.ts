import { ApiProperty } from '@nestjs/swagger';

export class PaginationMetaData {
  @ApiProperty({
    description: '총 아이템 수',
    example: 1,
  })
  totalItemCount: number;

  @ApiProperty({
    description: '현재 페이지 아이템 수',
    example: 1,
  })
  currentItemCount: number;

  @ApiProperty({
    description: '총 페이지 수',
    example: 1,
  })
  totalPage: number;

  @ApiProperty({
    description: '현재 페이지',
    example: 1,
  })
  currentPage: number;

  @ApiProperty({
    description: '페이지당 아이템 수',
    example: 30,
  })
  itemsPerPage: number;
}
