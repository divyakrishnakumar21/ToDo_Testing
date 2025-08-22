import { Controller, Post, Body } from '@nestjs/common';
// ...existing imports...
import { AuthService } from './auth/auth.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ApiBody } from '@nestjs/swagger';
import { AuthDto } from './auth/dto/auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  @Post('delete-user')
  @ApiOperation({ summary: 'Delete user by email (for testing only)' })
  @ApiBody({
    schema: {
      example: {
        email: 'playwrightuser@example.com'
      }
    }
  })
  async deleteUser(@Body() body: { email: string }) {
    if (!body.email) {
      return { message: 'Missing email' };
    }
    const deleted = await this.authService.deleteUserByEmail(body.email);
    return { message: deleted ? 'User deleted' : 'User not found' };
  }
  @ApiBody({
  schema: {
    example: {
      email: 'john@example.com'
    }
  }
})
  @Post('check-user')
  @ApiOperation({ summary: 'Check if user exists by email' })
  async checkUser(@Body() body: { email: string }) {
    if (!body.email) {
      return { exists: false };
    }
    const exists = await this.authService.checkUserExists(body.email);
    return { exists };
  }
  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password using token' })
  async resetPassword(@Body() body: { email: string; token: string; password: string }) {
    if (!body.email || !body.token || !body.password) {
      return { message: 'Missing required fields' };
    }
    const result = await this.authService.resetPasswordWithToken(body.email, body.token, body.password);
    if (!result) {
      return { message: 'Invalid token or user not found' };
    }
    return { message: 'Password reset successful' };
  }
  constructor(private readonly authService: AuthService) {}

  @ApiBody({
  schema: {
    example: {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'yourpassword123'
    }
  }
})
  @Post('signup')
  @ApiOperation({ summary: 'User signup' })
  async signup(@Body() authDto: AuthDto) {
    if (!authDto.email || !authDto.password || !authDto.name) {
      return { message: 'Missing required fields' };
    }
    try {
      const user = await this.authService.signup(authDto.name, authDto.email, authDto.password);
      return { message: 'Signup successful', user };
    } catch (err: any) {
      return { message: err.message };
    }
  }

  @ApiBody({
  schema: {
    example: {
      email: 'john@example.com',
      password: 'yourpassword123'
    }
  }
})
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

  @ApiBody({
  schema: {
    example: {
      email: 'john@example.com',
      password: 'newpassword123'
    }
  }
})
  @Post('forgot-password')
  @ApiOperation({ summary: 'Forgot password (direct reset)' })
  async forgotPassword(@Body() body: { email: string; password: string }) {
    if (!body.email || !body.password) {
      return { message: 'Missing email or new password' };
    }
    const userExists = await this.authService.checkUserExists(body.email);
    if (!userExists) {
      return { message: 'User not found' };
    }
    await this.authService.directResetPassword(body.email, body.password);
    return { message: 'Password reset successful.' };
  }
}

