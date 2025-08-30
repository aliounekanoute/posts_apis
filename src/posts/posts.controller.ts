import {
  Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post as PostMethod,
  UseGuards
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/user.decorator';
import { ApiBearerAuth, ApiTags, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private posts: PostsService) {}

  @Get()
  @ApiOkResponse({ description: 'Liste des posts (public)' })
  findAll() {
    return this.posts.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @PostMethod()
  @ApiBearerAuth('JWT-auth')
  @ApiCreatedResponse({ description: 'Post créé' })
  create(@Body() dto: CreatePostDto, @CurrentUser() user: { userId: number }) {
    return this.posts.create(dto, user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ description: 'Post mis à jour (auteur uniquement)' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePostDto,
    @CurrentUser() user: { userId: number },
  ) {
    return this.posts.update(id, dto, user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ description: 'Post supprimé (auteur uniquement)' })
  remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: { userId: number }) {
    return this.posts.remove(id, user.userId);
  }
}
