import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';
import { AuthService } from '../auth.service';

@Injectable()
// second argument is a name PassportStrategy. Then, refer to this via a decorator like @UseGuards(AuthGuard('jwt')).
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') { // jwt is default name of this strategy
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY
    });
  }

  // provide the verify callback by implementing a validate() method
  async validate(payload: any) {
    // auto bind data from payload of token after decoded to here
    const user = await this.userService.findUser({ username: payload.username });
    if (!user) {
      throw new UnauthorizedException();
    }
    user.password = undefined;
    return user;
  }
}
