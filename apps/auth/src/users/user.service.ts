import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';
import { JoinDto } from './dto/request/join.dto';
import { User } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(dto: JoinDto): Promise<User> {
    const hash = await bcrypt.hash(dto.password, 10);

    return this.userRepository.create({
      ...dto,
      password: hash,
    });
  }
}
