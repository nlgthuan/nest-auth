import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUseDto {
  @IsString()
  username: string;

  @IsNotEmpty()
  password: string;
}
