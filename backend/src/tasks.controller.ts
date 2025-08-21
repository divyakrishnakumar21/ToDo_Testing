import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateTaskDto } from './tasks/dto/create-task.dto';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  private tasks: any[] = [];

  @Get()
  @ApiOperation({ summary: 'List all tasks, optionally filter by date' })
  findAll(@Query('date') date?: string) {
    if (date) {
      return this.tasks.filter(t => t.dueDate?.toISOString().slice(0, 10) === date);
    }
    return this.tasks;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a task by ID' })
  findOne(@Param('id') id: string) {
    return this.tasks.find(t => t.id === id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  create(@Body() dto: CreateTaskDto) {
    const task = { ...dto, id: Date.now().toString(), completed: false };
    this.tasks.push(task);
    return task;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a task' })
  update(@Param('id') id: string, @Body() dto: CreateTaskDto) {
    const idx = this.tasks.findIndex(t => t.id === id);
    if (idx === -1) return { error: 'Task not found' };
    this.tasks[idx] = { ...this.tasks[idx], ...dto };
    return this.tasks[idx];
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  remove(@Param('id') id: string) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    return { deleted: true };
  }

  @Put(':id/complete')
  @ApiOperation({ summary: 'Mark task as complete/incomplete' })
  complete(@Param('id') id: string, @Body() body: { completed: boolean, completedOn?: string }) {
    const task = this.tasks.find(t => t.id === id);
    if (!task) return { error: 'Task not found' };
    task.completed = body.completed;
    if (body.completed) {
      task.completedOn = body.completedOn || new Date().toISOString();
    } else {
      task.completedOn = undefined;
    }
    return task;
  }
}
