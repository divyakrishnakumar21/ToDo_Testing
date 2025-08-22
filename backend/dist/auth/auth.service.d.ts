import { EmailService } from './email.service';
import { Model } from 'mongoose';
import { User } from './user.schema';
export declare class AuthService {
    private userModel;
    private emailService;
    deleteUserByEmail(email: string): Promise<boolean>;
    checkUserExists(email: string): Promise<boolean>;
    directResetPassword(email: string, newPassword: string): Promise<true | null>;
    resetPasswordWithToken(email: string, token: string, newPassword: string): Promise<true | null>;
    constructor(userModel: Model<User>, emailService: EmailService);
    sendResetLink(email: string): Promise<true | null>;
    signup(name: string, email: string, password: string): Promise<import("mongoose").Document<unknown, {}, User, {}, {}> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    validateUser(email: string, password: string): Promise<(import("mongoose").Document<unknown, {}, User, {}, {}> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    login(email: string, password: string): Promise<(import("mongoose").Document<unknown, {}, User, {}, {}> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    getProfile(userId: string): Promise<(import("mongoose").Document<unknown, {}, User, {}, {}> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    updateProfile(userId: string, name: string, email: string): Promise<(import("mongoose").Document<unknown, {}, User, {}, {}> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
}
