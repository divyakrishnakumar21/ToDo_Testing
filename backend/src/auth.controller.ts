import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthDto } from './auth/dto/auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  @Post('signup')
  @ApiOperation({ summary: 'User signup' })
  async signup(@Body() authDto: AuthDto) {
    // Accept name, email, password
    if (!authDto.email || !authDto.password || !authDto.name) {
      return { message: 'Missing required fields' };
    }
    const user = await this.authService.signup(authDto.name, authDto.email, authDto.password);
    return { message: 'Signup successful', user };
  }
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  async login(@Body() authDto: AuthDto) {
    const user = await this.authService.validateUser(authDto.email, authDto.password);
    if (!user) {
      return { message: 'Password incorrect' };
    }
    return { message: 'Login successful', user };
  }
}
