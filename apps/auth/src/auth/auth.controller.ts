import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';
import { LoginDto } from './dto/request/login.dto';
import { LoginResultDto } from './dto/response/login-result.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('login_user')
  async loginUser(dto: LoginDto): Promise<LoginResultDto> {
    const { accessToken, refreshToken } = await this.authService.login(dto);

    return new LoginResultDto(accessToken, refreshToken);
  }
}
