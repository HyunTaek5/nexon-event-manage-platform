import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { JoinDto } from './dto/request/join.dto';
import { UserService } from './user.service';
import { JoinResultDto } from './dto/response/join-result.dto';
import { PatchUserRoleDto } from './dto/request/patch-user-role.dto';
import { PatchUserRoleResultDto } from './dto/response/patch-user-role-result.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('join_user')
  async join(dto: JoinDto): Promise<JoinResultDto> {
    const createdUser = await this.userService.join(dto);

    return new JoinResultDto(createdUser);
  }

  @MessagePattern('patch_user_role')
  async patchUserRole(dto: PatchUserRoleDto): Promise<PatchUserRoleResultDto> {
    const { id, role } = dto;
    const updateResult = await this.userService.updateUserRole(id, role);

    return new PatchUserRoleResultDto(updateResult._id, updateResult.role);
  }
}
