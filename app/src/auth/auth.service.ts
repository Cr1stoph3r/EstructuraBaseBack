import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '.prisma/client';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import * as bcrypt from 'bcrypt';
import { Response } from '../interfaces/Response.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  async generateJwt(user: User) {
    const payload = { userId: user.id, email: user.email };

    const token = this.jwtService.sign(payload);
    return token;
  }

  async validateUser(login: LoginAuthDto): Promise<Response> {
    const userDb = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: login.user }, { user: login.user }],
      },
    });

    if (!userDb) {
      return {
        FlgOk: 0,
        message: 'Usuario o contraseña incorrecta',
        data: null,
      };
    }

    const isPasswordValid = await bcrypt.compare(
      login.password,
      userDb.password,
    );
    if (!isPasswordValid) {
      return {
        FlgOk: 0,
        message: 'Usuario o contraseña incorrecta',
        data: null,
      };
    }

    const token = await this.generateJwt(userDb);

    return {
      FlgOk: 1,
      message: 'Usuario logueado correctamente',
      data: { user: { ...userDb, password: null }, token },
    };
  }

  async register(registerDto: RegisterAuthDto): Promise<Response> {
    try {
      const hashedPassword = await this.hashPassword(registerDto.password);

      const userExist = await this.prisma.user.findFirst({
        where: {
          OR: [
            { email: registerDto.email },
            { user: registerDto.user },
            { dni: registerDto.dni },
          ],
        },
      });

      if (userExist) {
        let message = 'El campo';
        if (userExist.email === registerDto.email) {
          message += 'Email';
        } else if (userExist.user === registerDto.user) {
          message += 'Usuario';
        } else if (userExist.dni === registerDto.dni) {
          message += 'DNI';
        }
        message += ' ya existe';
        return { FlgOk: 0, message, data: null };
      }

      const result = await this.prisma.$transaction(async (prisma) => {
        try {
          const user = await prisma.user.create({
            data: {
              email: registerDto.email,
              password: hashedPassword,
              name: registerDto.firstName,
              user: registerDto.user,
              dni: registerDto.dni,
              lastName: registerDto.lastName,
              userProfiles: {
                create: registerDto.profiles.map((profile) => ({
                  profileId: profile,
                })),
              },
            },
          });

          return {
            FlgOk: 1,
            data: { ...user, rolesId: registerDto.profiles },
            message: 'Usuario creado correctamente',
          };
        } catch (error) {
          return {
            FlgOk: 0,
            message: 'Error en la creacion de usuario',
            data: null,
          };
        }
      });

      return result;
    } catch (error) {
      return { FlgOk: 0, message: error.message, data: null };
    }
  }
}
