import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthModule } from './auth/auth.module';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks/tasks.service';
import { Task, TaskSchema } from './tasks/task.schema';
import { User, UserSchema } from './auth/user.schema';
import { AuthService } from './auth/auth.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/todo_db'),
    MongooseModule.forFeature([
      { name: Task.name, schema: TaskSchema },
    ]),
    AuthModule,
  ],
  controllers: [AuthController, TasksController],
  providers: [TasksService],
})
export class AppModule {}