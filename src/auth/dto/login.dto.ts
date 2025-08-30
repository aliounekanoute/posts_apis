
import { IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'ali@example.com' }) @IsEmail() email: string;
  @ApiProperty({ minLength: 6 }) @MinLength(6) motDePasse: string;
}
