import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthDto } from './auth/dto/auth.dto';

let users: { email: string; password: string }[] = [];

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  @Post('signup')
  @ApiOperation({ summary: 'User signup' })
  signup(@Body() authDto: AuthDto) {
    const existing = users.find(u => u.email === authDto.email);
    if (existing) {
      return { message: 'Signup failed', error: 'Email already exists' };
    }
    users.push({ email: authDto.email, password: authDto.password });
    return { message: 'Signup successful' };
  }

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  login(@Body() authDto: AuthDto) {
    const user = users.find(u => u.email === authDto.email && u.password === authDto.password);
    if (user) {
      return { message: 'Login successful', user: authDto };
    }
    return { message: 'Login failed', error: 'Invalid credentials' };
  }
}
