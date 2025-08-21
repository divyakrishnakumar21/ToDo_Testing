import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthDto } from './auth/dto/auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  @Post('login')
  @ApiOperation({ summary: 'User login' })
  login(@Body() authDto: AuthDto) {
    // Example response
    return { message: 'Login successful', user: authDto };
  }
}
