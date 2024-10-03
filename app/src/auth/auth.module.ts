import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { PrismaModule } from '../prisma/prisma.module';
import * as fs from 'fs';
import * as path from 'path';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      privateKey: fs.readFileSync(
        path.resolve(__dirname, '../../keys/private.pem'),
      ),
      publicKey: fs.readFileSync(
        path.resolve(__dirname, '../../keys/public.pem'),
      ),
      signOptions: {
        algorithm: 'RS256',
        expiresIn: '1m',
      },
    }),
    PrismaModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
