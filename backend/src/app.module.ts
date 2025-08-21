import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks/tasks.service';
import { Task, TaskSchema } from './tasks/task.schema';
// ...existing code...
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/todo_db'),
    MongooseModule.forFeature([
      { name: Task.name, schema: TaskSchema },
    ]),
  ],
  controllers: [AuthController, TasksController],
  providers: [TasksService],
})
export class AppModule {}