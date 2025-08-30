import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty() @IsNotEmpty() titre: string;
  @ApiProperty() @IsNotEmpty() contenu: string;
}
