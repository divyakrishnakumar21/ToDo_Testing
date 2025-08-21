import { CreateTaskDto } from './tasks/dto/create-task.dto';
export declare class TasksController {
    private tasks;
    findAll(date?: string): any[];
    findOne(id: string): any;
    create(dto: CreateTaskDto): {
        id: string;
        completed: boolean;
        title: string;
        description?: string;
    };
    update(id: string, dto: CreateTaskDto): any;
    remove(id: string): {
        deleted: boolean;
    };
    complete(id: string, completed: boolean): any;
}
