import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { AuthController } from '../auth.controller';
import { User, UserSchema } from './user.schema';
import { EmailService } from './email.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [AuthService, EmailService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
