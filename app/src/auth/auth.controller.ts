import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginAuthDto) {
    const resValidate = await this.authService.validateUser(loginDto)

    return resValidate;
  }

  @Post('register')
  async register(@Body() registerDto: RegisterAuthDto) {
    const resRegister = await this.authService.register(registerDto)
    return resRegister;
  }

}
