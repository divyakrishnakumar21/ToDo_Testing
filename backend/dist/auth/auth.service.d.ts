import { User } from './user.entity';
export declare class AuthService {
    private users;
    signup(name: string, email: string, password: string): Promise<User>;
    validateUser(email: string, password: string): Promise<User | null>;
    login(email: string, password: string): Promise<User | null>;
    getProfile(userId: string): Promise<User | undefined>;
    updateProfile(userId: string, name: string, email: string): Promise<User | undefined>;
}
