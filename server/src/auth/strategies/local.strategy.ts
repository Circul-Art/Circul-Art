import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

interface ValidatedUser {
  id: number;
  name: string;
  firstname: string;
  roles: Array<{ name: string }>;
  isVerified: boolean;
}

function isValidUser(obj: unknown): obj is ValidatedUser {
  if (!obj || typeof obj !== 'object') return false;

  const candidate = obj as Partial<ValidatedUser>;

  return (
    typeof candidate.id === 'number' &&
    Array.isArray(candidate.roles) &&
    typeof candidate.isVerified === 'boolean' &&
    typeof candidate.name === 'string' &&
    typeof candidate.firstname === 'string'
  );
}

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<ValidatedUser> {
    try {
      const result: unknown = await this.authService.validateUser(
        email,
        password,
      );

      if (!result) {
        throw new UnauthorizedException('Identifiants invalides');
      }

      if (!isValidUser(result)) {
        throw new UnauthorizedException("Format d'utilisateur invalide");
      }

      return {
        id: result.id,
        name: result.name,
        firstname: result.firstname,
        roles: result.roles,
        isVerified: result.isVerified,
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException(
        'Erreur lors de la validation des identifiants',
      );
    }
  }
}
