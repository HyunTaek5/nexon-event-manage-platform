import { Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationMetaData } from '@app/common/pagination/pagination-meta-data.dto';

export class Paginated<T> {
  items: T[];
  meta: PaginationMetaData;

  constructor(
    items: T[],
    offset: number,
    limit: number,
    totalItemCount: number,
  ) {
    const currentPage = Math.floor(offset / limit) + 1;
    const totalPage = Math.ceil(totalItemCount / limit);
    const currentItemCount = items.length;

    this.items = items;
    this.meta = {
      totalItemCount,
      currentItemCount,
      totalPage: totalPage === 0 ? 1 : totalPage,
      currentPage,
      itemsPerPage: limit,
    };
  }
}

export function BasePaginatedDto<D>(DtoClass: Type<D>, resourceName: string) {
  class PaginatedHost<D> {
    @ApiProperty({ isArray: true, type: () => DtoClass })
    items: D[];

    @ApiProperty({ type: () => PaginationMetaData })
    pagination: PaginationMetaData;

    constructor(
      items: D[],
      totalItemCount: number,
      currentPage: number,
      itemsPerPage: number,
    ) {
      const totalPage = Math.ceil(totalItemCount / itemsPerPage);

      this.items = items;
      this.pagination = {
        totalItemCount,
        currentItemCount: items.length,
        totalPage: totalPage === 0 ? 1 : totalPage,
        currentPage,
        itemsPerPage,
      };
    }
  }

  Object.defineProperty(PaginatedHost, 'name', {
    writable: false,
    value: `Paginated${resourceName}`,
  });

  return PaginatedHost;
}
