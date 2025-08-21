import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ description: 'Title of the task' })
  title!: string;

  @ApiProperty({ description: 'Description of the task', required: false })
  description?: string;
}