import { UserRole } from '../../enum/role.enum';
import { IsEmail, IsEnum, IsString } from 'class-validator';

export class JoinDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  nickname: string;

  @IsEnum(UserRole)
  role: UserRole;
}
