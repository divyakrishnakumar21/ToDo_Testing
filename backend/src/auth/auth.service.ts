import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  async signup(name: string, email: string, password: string) {
    const hash = await bcrypt.hash(password, 10);
    const user = new this.userModel({ name, email, password: hash });
    await user.save();
    return user;
  }

  async validateUser(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    console.log('DEBUG: Found user:', user);
    if (!user) return null;
    const passwordMatch = await bcrypt.compare(password, user.password || '');
    console.log('DEBUG: Password match:', passwordMatch);
    if (passwordMatch) {
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
    return this.userModel.findById(userId);
  }

  async updateProfile(userId: string, name: string, email: string) {
    const user = await this.userModel.findById(userId);
    if (user) {
      user.name = name;
      user.email = email;
      await user.save();
    }
    return user;
  }
}
