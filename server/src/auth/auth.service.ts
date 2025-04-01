import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { PasswordUtils } from '../utils/password.utils';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.usersService.findByEmail(email);

      const isPasswordValid = PasswordUtils.validatePassword(
        password,
        user.salt,
        user.password,
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException('Identifiants invalides');
      }

      if (!user.isVerified) {
        throw new UnauthorizedException(
          "Votre compte n'est pas vérifié. Veuillez vérifier votre email avant de vous connecter.",
        );
      }

      return {
        id: user.id,
        roles: user.roles,
        isVerified: user.isVerified,
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Identifiants invalides');
    }
  }

  login(): { message: string } {
    return { message: 'Connexion réussie' };
  }

  async getProfile(userId: number) {
    const user = await this.usersService.findOne(userId);

    return {
      name: user.name,
      firstname: user.firstname,
      email: user.email,
      phone: user.phone,
      siret: user.siret,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  logout(): { message: string } {
    return { message: 'Déconnexion réussie' };
  }
}
