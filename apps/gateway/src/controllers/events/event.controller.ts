import {
  Body,
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Roles } from '../../guards/roles.decorator';
import { UserRole } from '@app/common/enum/role.enum';
import { CreateEventDto } from './dto/request/create-event.dto';
import { catchError, firstValueFrom } from 'rxjs';
import { CreateEventResultDto } from './dto/response/create-event-result.dto';
import { Public } from '../../decorators/public.decorator';
import { GetEventDetailResultDto } from './dto/response/get-event-detail-result.dto';
import { PaginationRequestDto } from '@app/common/pagination/pagination-request.dto';
import { BasePaginatedDto, Paginated } from '@app/common/pagination/paginated';
import { GetEventResultDto } from './dto/response/get-event-result.dto';
import { ObjectIdValidationPipe } from '@app/common/pipe/objectId-validation.pipe';

@Controller({ path: 'events', version: '1' })
export class EventController {
  constructor(
    @Inject('EVENT_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  @ApiOperation({
    summary: '이벤트 목록 조회',
    description: '이벤트 목록 조회 API',
  })
  @ApiOkResponse({
    type: BasePaginatedDto<GetEventResultDto>(
      GetEventResultDto,
      'EventResultDto',
    ),
  })
  @Public()
  @Get()
  async getEvent(
    @Query() dto: PaginationRequestDto,
  ): Promise<Paginated<GetEventResultDto>> {
    try {
      return await firstValueFrom(
        this.client
          .send('get_event_list', { offset: dto.offset, limit: dto.limit })
          .pipe(
            catchError(() => {
              throw new InternalServerErrorException(
                '이벤트 목록 조회에 실패했습니다.',
              );
            }),
          ),
      );
    } catch (err) {
      throw err;
    }
  }

  @ApiOperation({
    summary: '이벤트 생성',
    description:
      '이벤트 생성 API\n\n 이벤트 보상 등록시 타입별 metadata 형식은 다음과 같습니다.\n\n' +
      'type: "item" -> \n' +
      'metadata: { itemCode: string, expireDate?: string }\n\n' +
      'type: "point" -> \n' +
      'metadata: { note?: string }\n\n' +
      'type: "coupon" -> \n' +
      'metadata: { couponId: string, validDays?: number }\n\n',
  })
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN, UserRole.OPERATOR)
  @Post()
  async createEvent(
    @Body() dto: CreateEventDto,
  ): Promise<CreateEventResultDto> {
    try {
      return await firstValueFrom(
        this.client.send('create_event', dto).pipe(
          catchError(() => {
            throw new InternalServerErrorException(
              '이벤트 생성에 실패했습니다.',
            );
          }),
        ),
      );
    } catch (err) {
      throw err;
    }
  }

  @ApiOperation({
    summary: '이벤트 상세 조회',
    description: '이벤트 상세 조회 API',
  })
  @Public()
  @Get('/:id')
  async getEventById(
    @Param('id', ObjectIdValidationPipe) id: string,
  ): Promise<GetEventDetailResultDto> {
    try {
      return await firstValueFrom(
        this.client.send('get_event_by_id', id).pipe(
          catchError((err) => {
            if (err.status === 404) {
              throw new NotFoundException('해당 이벤트를 찾을 수 없습니다.');
            }

            throw new InternalServerErrorException(
              '이벤트 조회에 실패했습니다.',
            );
          }),
        ),
      );
    } catch (err) {
      throw err;
    }
  }
}
