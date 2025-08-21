import { AuthDto } from './auth/dto/auth.dto';
export declare class AuthController {
    login(authDto: AuthDto): {
        message: string;
        user: AuthDto;
    };
}
