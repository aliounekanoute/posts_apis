import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Post) private repo: Repository<Post>) {}

  async create(dto: CreatePostDto, authorId: number) {
    const post = this.repo.create({
      titre: dto.titre,
      contenu: dto.contenu,
      author: { id: authorId } as any,
    });
    return this.repo.save(post);
  }

  findAll() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async findOneOrThrow(id: number) {
    const post = await this.repo.findOne({ where: { id } });
    if (!post) throw new NotFoundException('Post introuvable');
    return post;
  }

  async update(id: number, dto: UpdatePostDto, userId: number) {
    const post = await this.findOneOrThrow(id);
    if (post.author.id !== userId) throw new ForbiddenException('Non autorisé');
    Object.assign(post, dto);
    return this.repo.save(post);
  }

  async remove(id: number, userId: number) {
    const post = await this.findOneOrThrow(id);
    if (post.author.id !== userId) throw new ForbiddenException('Non autorisé');
    await this.repo.remove(post);
    return { deleted: true };
  }
}
