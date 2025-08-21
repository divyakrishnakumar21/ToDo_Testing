import { Model } from 'mongoose';
import { Task } from './task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TasksService {
    private taskModel;
    constructor(taskModel: Model<Task>);
    findAll(user: string): Promise<Task[]>;
    findOne(id: string): Promise<Task | null>;
    create(createTaskDto: CreateTaskDto): Promise<Task>;
    update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task | null>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
    complete(id: string, completed: boolean, completedOn?: string): Promise<Task | null>;
}
