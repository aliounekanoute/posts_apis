import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/user.decorator';
import { ApiBearerAuth, ApiTags, ApiOkResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private users: UsersService) {}

  @ApiTags('users')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiOkResponse({ description: 'Profil courant' })
  async me(@CurrentUser() user: { userId: number }) {
    const u = await this.users.findByIdOrThrow(user.userId);
    return u; // password exclu via @Exclude + ClassSerializerInterceptor
  }
}
