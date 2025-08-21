import { AuthService } from './auth/auth.service';
import { AuthDto } from './auth/dto/auth.dto';
export declare class AuthController {
    private readonly authService;
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
    constructor(authService: AuthService);
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
}
