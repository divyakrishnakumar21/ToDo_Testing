
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty()
  name!: string;
  @ApiProperty()
  email!: string;

  @ApiProperty()
  password!: string;
}