import { AuthService } from './auth/auth.service';
import { AuthDto } from './auth/dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    checkUser(body: {
        email: string;
    }): Promise<{
        exists: boolean;
    }>;
    resetPassword(body: {
        email: string;
        token: string;
        password: string;
    }): Promise<{
        message: string;
    }>;
    constructor(authService: AuthService);
    signup(authDto: AuthDto): Promise<{
        message: string;
        user?: undefined;
    } | {
        message: string;
        user: import("mongoose").Document<unknown, {}, import("./auth/user.schema").User, {}, {}> & import("./auth/user.schema").User & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    login(authDto: AuthDto): Promise<{
        message: string;
        user?: undefined;
    } | {
        message: string;
        user: import("mongoose").Document<unknown, {}, import("./auth/user.schema").User, {}, {}> & import("./auth/user.schema").User & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    forgotPassword(body: {
        email: string;
        password: string;
    }): Promise<{
        message: string;
    }>;
}
