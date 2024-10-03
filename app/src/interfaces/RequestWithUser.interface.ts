import { Request } from 'express';

export interface JwtPayload {
    id: number;
    email: string;
    perfil: number;
}

interface RequestWithUser extends Request {
    user: JwtPayload;
}