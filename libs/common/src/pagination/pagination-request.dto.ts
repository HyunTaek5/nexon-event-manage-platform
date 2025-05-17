import { IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationRequestDto {
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  offset: number = 0;

  @IsNumber()
  @Type(() => Number)
  @Min(1)
  limit: number = 30;
}
