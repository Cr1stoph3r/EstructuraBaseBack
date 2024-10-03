import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProfileModule } from './profile/profile.module';
import { ConfigModule } from '@nestjs/config';
import { MenusModule } from './menus/menus.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}),PrismaModule, AuthModule, UsersModule, ProfileModule, MenusModule],
})
export class AppModule {}
