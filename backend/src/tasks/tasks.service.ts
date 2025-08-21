import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async findOne(id: string): Promise<Task | null> {
    return this.taskModel.findById(id).exec();
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel(createTaskDto);
    return createdTask.save();
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task | null> {
    return this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true }).exec();
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    await this.taskModel.findByIdAndDelete(id).exec();
    return { deleted: true };
  }

  async complete(id: string, completed: boolean, completedOn?: string): Promise<Task | null> {
    return this.taskModel.findByIdAndUpdate(
      id,
      { completed, completedOn: completed ? completedOn || new Date() : undefined },
      { new: true }
    ).exec();
  }
}
