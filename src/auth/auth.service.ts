
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private users: UsersService, private jwt: JwtService) {}

  async register(dto: RegisterDto) {
    const exists = await this.users.findByEmail(dto.email);
    if (exists) throw new BadRequestException('Email déjà utilisé');
    const hash = await bcrypt.hash(dto.motDePasse, 10);
    const user = await this.users.create({
      nom: dto.nom,
      prenom: dto.prenom,
      email: dto.email,
      motDePasseHash: hash,
    });
    const token = await this.sign(user.id, user.email);
    return { user, token };
  }

  async login(dto: LoginDto) {
    const user = await this.users.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Identifiants invalides');
    const ok = await bcrypt.compare(dto.motDePasse, user.motDePasseHash);
    if (!ok) throw new UnauthorizedException('Identifiants invalides');
    const token = await this.sign(user.id, user.email);
    return { user, token };
  }

  private async sign(sub: number, email: string) {
    return this.jwt.signAsync({ sub, email });
  }
}
