import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable({})
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.getUser(username);
    if (!user) return null;
    const passwordValid = await argon.verify(user.password, password);
    if (passwordValid) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, _id: user._id };
    return {
      accessToken: this.jwtService.sign(payload)
    }
  }
}
