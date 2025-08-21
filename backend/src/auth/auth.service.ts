import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  private users: User[] = [];

  async signup(name: string, email: string, password: string) {
    const hash = await bcrypt.hash(password, 10);
    const user: User = { id: Date.now().toString(), name, email, password: hash };
    this.users.push(user);
    return user;
  }

  async validateUser(email: string, password: string) {
    const user = this.users.find(u => u.email === email);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) return null;
    // JWT token generation here
    return user;
  }

  async getProfile(userId: string) {
    return this.users.find(u => u.id === userId);
  }

  async updateProfile(userId: string, name: string, email: string) {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      user.name = name;
      user.email = email;
    }
    return user;
  }
}
