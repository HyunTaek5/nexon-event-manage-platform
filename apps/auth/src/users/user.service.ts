import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';
import { JoinDto } from './dto/request/join.dto';
import { User } from './schema/user.schema';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async join(dto: JoinDto): Promise<User> {
    await this.checkDuplicateEmail(dto.email);
    await this.checkDuplicateNickname(dto.nickname);

    const hash = await bcrypt.hash(dto.password, 10);

    return this.userRepository.create({
      ...dto,
      password: hash,
    });
  }

  async checkDuplicateEmail(email: string): Promise<void> {
    const user = await this.userRepository.findOneOrNull({
      email: email,
    });

    if (user) {
      throw new RpcException({
        status: 409,
        message: '이미 존재하는 이메일입니다.',
      });
    }
  }

  async checkDuplicateNickname(nickname: string): Promise<void> {
    const user = await this.userRepository.findOneOrNull({
      nickname: nickname,
    });

    if (user) {
      throw new RpcException({
        status: 409,
        message: '이미 존재하는 닉네임입니다.',
      });
    }
  }
}
