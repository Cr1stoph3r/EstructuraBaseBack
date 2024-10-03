import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';
import { User, Profile } from '.prisma/client';

export class RegisterAuthDto {
    @IsNotEmpty()
    @IsEmail()
    email: User['email']; 

    @IsNotEmpty()
    @MinLength(6)
    user: User['user'];

    @IsNotEmpty()
    dni: User['dni'];

    @IsNotEmpty()
    @MinLength(8)
    password: User['password']; 

    @IsNotEmpty()
    firstName: User['name']; 

    @IsNotEmpty()
    lastName: User['lastName']; 

    @IsNotEmpty()
    profiles: Profile['id'][];
}
