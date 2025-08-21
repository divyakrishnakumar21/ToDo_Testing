import { CreateTaskDto } from './tasks/dto/create-task.dto';
import { UpdateTaskDto } from './tasks/dto/update-task.dto';
import { TasksService } from './tasks/tasks.service';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    findAll(): Promise<import("./tasks/task.schema").Task[]>;
    findOne(id: string): Promise<import("./tasks/task.schema").Task | null>;
    create(dto: CreateTaskDto): Promise<import("./tasks/task.schema").Task>;
    update(id: string, dto: UpdateTaskDto): Promise<import("./tasks/task.schema").Task | null>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
    complete(id: string, body: {
        completed: boolean;
        completedOn?: string;
    }): Promise<import("./tasks/task.schema").Task | null>;
}
