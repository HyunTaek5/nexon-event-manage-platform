import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/request/create-event.dto';
import { CreateEventResultDto } from './dto/response/create-event-result.dto';
import { GetEventDetailResultDto } from './dto/response/get-event-detail-result.dto';
import { GetEventResultDto } from './dto/response/get-event-result.dto';
import { Paginated } from '@app/common/pagination/paginated';
import { PaginationRequestDto } from '@app/common/pagination/pagination-request.dto';

@Controller()
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @MessagePattern('create_event')
  async createEvent(dto: CreateEventDto): Promise<CreateEventResultDto> {
    const data = await this.eventService.createEvent(dto);

    return new CreateEventResultDto(data.event, data?.createdRewards);
  }

  @MessagePattern('get_event_by_id')
  async getEventById(id: string): Promise<GetEventDetailResultDto> {
    const data = await this.eventService.findOneByIdWithRewards(id);

    return new GetEventDetailResultDto(data);
  }

  @MessagePattern('get_event_list')
  async getEventList(data: PaginationRequestDto) {
    const { items, meta } = await this.eventService.findAllWithPagination(
      data.offset,
      data.limit,
    );

    return new Paginated<GetEventResultDto>(
      items.map((item) => new GetEventResultDto(item)),
      data.offset,
      data.limit,
      meta.totalItemCount,
    );
  }
}
