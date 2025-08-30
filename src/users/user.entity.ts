import {
  Entity, PrimaryGeneratedColumn, Column, OneToMany,
  CreateDateColumn, UpdateDateColumn
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Post } from '../posts/post.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column() nom: string;

  @Column() prenom: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  motDePasseHash: string;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
}
