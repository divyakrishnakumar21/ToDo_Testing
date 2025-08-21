import { Controller, Post, Body } from '@nestjs/common';
// ...existing imports...
import { AuthService } from './auth/auth.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthDto } from './auth/dto/auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'User signup' })
  async signup(@Body() authDto: AuthDto) {
    if (!authDto.email || !authDto.password || !authDto.name) {
      return { message: 'Missing required fields' };
    }
    const user = await this.authService.signup(authDto.name, authDto.email, authDto.password);
    return { message: 'Signup successful', user };
  }

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  async login(@Body() authDto: AuthDto) {
    if (!authDto.email || !authDto.password) {
      return { message: 'Missing email or password' };
    }
    const user = await this.authService.validateUser(authDto.email, authDto.password);
    if (!user) {
      return { message: 'Password incorrect' };
    }
    return { message: 'Login successful', user };
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Forgot password (reset)' })
  async forgotPassword(@Body() body: { email: string; password: string }) {
    if (!body.email || !body.password) {
      return { message: 'Missing email or new password' };
    }
    const user = await this.authService.resetPassword(body.email, body.password);
    if (!user) {
      return { message: 'User not found' };
    }
    return { message: 'Password updated successfully', user };
  }
}

