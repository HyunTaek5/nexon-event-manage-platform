import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ObjectIdValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (
      typeof value !== 'string' ||
      !Types.ObjectId.isValid(value) ||
      new Types.ObjectId(value).toString() !== value
    ) {
      throw new BadRequestException(`유효하지 않은 id 형식입니다.: ${value}`);
    }
    return value;
  }
}
