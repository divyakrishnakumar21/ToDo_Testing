import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Task extends Document {
  @Prop({ required: true })
  title!: string;

  @Prop()
  description?: string;

  @Prop()
  dueDate?: Date;

  @Prop({ default: false })
  completed!: boolean;

  @Prop({ default: false })
  important?: boolean;

  @Prop()
  completedOn?: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
