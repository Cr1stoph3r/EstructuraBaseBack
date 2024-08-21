import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { Profile } from '@prisma/client';

export class CreateProfileDto {
    @IsNotEmpty()
    @IsString()
    profile: Profile['profile'];

    @IsNotEmpty()
    @IsString()
    description: Profile['description'];
}
