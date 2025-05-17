import {
  Body,
  Controller,
  Inject,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Roles } from '../../guards/roles.decorator';
import { UserRole } from '@app/common/enum/role.enum';
import { CreateEventDto } from './dto/request/create-event.dto';
import { catchError, firstValueFrom } from 'rxjs';
import { CreateEventResultDto } from './dto/response/create-event-result.dto';

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
}
