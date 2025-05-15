import { UserRole } from '../../enum/role.enum';

export class JoinDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  nickname: string;
  role: UserRole;
}
