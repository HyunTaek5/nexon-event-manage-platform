import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';
import { LoginDto } from './dto/request/login.dto';
import { LoginResultDto } from './dto/response/login-result.dto';
import { ValidateUserDto } from './dto/request/validate-user.dto';
import { ValidateUserResultDto } from './dto/response/validate-user-result.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('login_user')
  async loginUser(dto: LoginDto): Promise<LoginResultDto> {
    const loginResult = await this.authService.login(dto);

    return new LoginResultDto(loginResult);
  }

  @MessagePattern('valid_user')
  async validUser(dto: ValidateUserDto): Promise<ValidateUserResultDto> {
    const user = await this.authService.authUserWithId(dto.userId);

    return new ValidateUserResultDto(user._id, user);
  }
}
