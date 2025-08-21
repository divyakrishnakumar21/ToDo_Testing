
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({ required: false })
  name?: string;
  @ApiProperty()
  email!: string;

  @ApiProperty()
  password!: string;
}