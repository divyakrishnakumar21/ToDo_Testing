import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TasksController } from './tasks.controller';

@Module({
  imports: [],
  controllers: [AuthController, TasksController],
  providers: [],
})
export class AppModule {}