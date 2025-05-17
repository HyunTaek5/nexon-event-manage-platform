import {
  Body,
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  Param,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Roles } from '../../guards/roles.decorator';
import { UserRole } from '@app/common/enum/role.enum';
import { CreateEventDto } from './dto/request/create-event.dto';
import { catchError, firstValueFrom } from 'rxjs';
import { CreateEventResultDto } from './dto/response/create-event-result.dto';
import { Public } from '../../decorators/public.decorator';
import { GetEventDetailResultDto } from './dto/response/get-event-detail-result.dto';

@Controller({ path: 'events', version: '1' })
export class EventController {
  constructor(
    @Inject('EVENT_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  @ApiOperation({
    summary: '이벤트 생성',
    description: '이벤트 생성 API',
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
    @Param('id') id: string,
  ): Promise<GetEventDetailResultDto> {
    try {
      return await firstValueFrom(
        this.client.send('get_event_by_id', id).pipe(
          catchError(() => {
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
