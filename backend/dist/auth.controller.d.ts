import { AuthDto } from './auth/dto/auth.dto';
export declare class AuthController {
    signup(authDto: AuthDto): {
        message: string;
        error: string;
    } | {
        message: string;
        error?: undefined;
    };
    login(authDto: AuthDto): {
        message: string;
        user: AuthDto;
        error?: undefined;
    } | {
        message: string;
        error: string;
        user?: undefined;
    };
}
