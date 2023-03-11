import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUseDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
