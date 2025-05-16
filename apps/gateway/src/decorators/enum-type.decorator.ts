import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export function EnumType(enumType: any, enumName: string) {
  return applyDecorators(ApiProperty({ enum: enumType, enumName }));
}
