
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty() @IsNotEmpty() nom: string;
  @ApiProperty() @IsNotEmpty() prenom: string;
  @ApiProperty({ example: 'ali@example.com' }) @IsEmail() email: string;
  @ApiProperty({ minLength: 6 }) @MinLength(6) motDePasse: string;
}
