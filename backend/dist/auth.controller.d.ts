import { AuthService } from './auth/auth.service';
import { AuthDto } from './auth/dto/auth.dto';
export declare class AuthController {
    private readonly authService;
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
        user?: undefined;
    } | {
        message: string;
        user: import("mongoose").Document<unknown, {}, import("./auth/user.schema").User, {}, {}> & import("./auth/user.schema").User & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
}
