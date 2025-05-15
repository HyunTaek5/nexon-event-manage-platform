import { Body, Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { JoinDto } from './dto/request/join.dto';
import { UserService } from './user.service';
import { JoinResultDto } from './dto/response/join-result.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('join_user')
  async join(@Body() dto: JoinDto): Promise<JoinResultDto> {
    const createdUser = await this.userService.join(dto);

    return new JoinResultDto(createdUser);
  }
}
