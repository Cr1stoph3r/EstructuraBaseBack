import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as fs from 'fs';
import * as path from 'path';
import { JwtPayload } from '../interfaces/RequestWithUser.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: fs.readFileSync(path.resolve(__dirname, '../../keys/public.pem')),
      algorithms: ['RS256'],
    });
  }

async validate(payload: JwtPayload) {
    return payload;
}
}
