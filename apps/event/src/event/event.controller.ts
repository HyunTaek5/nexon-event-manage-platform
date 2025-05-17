import { Controller } from '@nestjs/common';
import { EventService } from './event.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateEventDto } from './dto/request/create-event.dto';
import { CreateEventResultDto } from './dto/response/create-event-result.dto';
import { GetEventDetailResultDto } from './dto/response/get-event-detail-result.dto';

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
}
