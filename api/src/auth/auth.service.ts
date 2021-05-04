
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt'
import { UserDocument } from 'src/users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
    private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user:UserDocument = await this.usersService.findOne(username);
    if (await bcrypt.compare(pass, user.hash)) {
      return  {sub:user.id, username:user.username}
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.sub };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}