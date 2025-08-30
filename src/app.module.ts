import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';
import { Post } from './posts/post.entity';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        type: 'sqlite',
        database: cfg.get<string>('SQLITE_DB') || './db.sqlite',
        entities: [User, Post],
        synchronize: true, // OK pour démo; en prod: migrations
        logging: false,
      }),
    }),
    UsersModule,
    AuthModule,
    PostsModule,
  ],
})
export class AppModule {}
