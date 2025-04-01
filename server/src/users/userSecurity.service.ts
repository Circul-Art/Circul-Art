import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { EmailService } from '../utils/email/email.service';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import * as path from 'path';
import * as Handlebars from 'handlebars';
import { PasswordUtils } from '../utils/password.utils';
import { Matches, MinLength, validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

// Type helper pour la gestion des erreurs
type ErrorWithMessage = {
  message: string;
};

// Fonction typée pour vérifier si un objet est une erreur avec un message
function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    error !== null &&
    typeof error === 'object' &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  );
}

// Fonction sécurisée pour extraire le message d'une erreur
function getErrorMessage(error: unknown): string {
  if (isErrorWithMessage(error)) {
    return error.message;
  }
  return 'Erreur inconnue';
}

// Types d'actions supportées
export enum SecurityActionType {
  VERIFY_EMAIL = 'VERIFY_EMAIL',
  RESET_PASSWORD = 'RESET_PASSWORD',
}

// Interface pour le payload du token
interface SecurityTokenPayload {
  userId: string;
  actionType: SecurityActionType;
}

// Interface pour les requêtes d'action
export interface SecurityActionRequest {
  actionType: SecurityActionType;
  token?: string;
  email?: string;
  newPassword?: string;
}

class PasswordValidation {
  @MinLength(10, {
    message: 'Le mot de passe doit contenir au moins 10 caractères',
  })
  @Matches(/[a-z]/, {
    message: 'Le mot de passe doit contenir au moins une lettre minuscule',
  })
  @Matches(/[A-Z]/, {
    message: 'Le mot de passe doit contenir au moins une lettre majuscule',
  })
  @Matches(/[0-9]/, {
    message: 'Le mot de passe doit contenir au moins un chiffre',
  })
  @Matches(/[!@#$%^&*(),.?":{}|<>]/, {
    message: 'Le mot de passe doit contenir au moins un symbole',
  })
  password: string;
}

@Injectable()
export class UserSecurityService {
  private templates: Map<SecurityActionType, HandlebarsTemplateDelegate> =
    new Map();
  private readonly JWT_SECRET = process.env.JWT_SECRET;
  private readonly FRONTEND_URL = process.env.FRONTEND_URL;
  private usedTokens: Set<string> = new Set();

  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private emailService: EmailService,
  ) {
    this.loadTemplates();
  }

  // Point d'entrée principal pour toutes les actions de sécurité
  async processSecurityAction(
    request: SecurityActionRequest,
  ): Promise<{ message: string; userId?: string }> {
    try {
      switch (request.actionType) {
        case SecurityActionType.VERIFY_EMAIL:
          if (!request.token)
            throw new BadRequestException('Token requis pour cette action');
          return this.verifyEmail(request.token);

        case SecurityActionType.RESET_PASSWORD:
          if (request.token && request.newPassword) {
            // Réinitialisation de mot de passe
            return this.resetPassword(request.token, request.newPassword);
          } else if (request.email) {
            // Envoi d'email de réinitialisation
            return this.sendPasswordResetEmail(request.email);
          }
          throw new BadRequestException(
            'Token avec mot de passe ou email requis pour cette action',
          );

        default:
          throw new BadRequestException('Action non supportée');
      }
    } catch (error: unknown) {
      if (error instanceof BadRequestException) throw error;
      throw new BadRequestException(`Erreur: ${getErrorMessage(error)}`);
    }
  }

  // Charge les templates d'emails
  private loadTemplates(): void {
    const templatePaths = {
      [SecurityActionType.VERIFY_EMAIL]:
        'src/utils/email/templates/verification.html',
      [SecurityActionType.RESET_PASSWORD]:
        'src/utils/email/templates/reset-password.html',
    };

    Object.entries(templatePaths).forEach(([type, templatePath]) => {
      try {
        const fullPath = path.join(process.cwd(), templatePath);
        const content = fs.readFileSync(fullPath, 'utf8');
        this.templates.set(
          type as SecurityActionType,
          Handlebars.compile(content),
        );
      } catch (error: unknown) {
        console.error(
          `Erreur lors du chargement du template ${type}: ${getErrorMessage(error)}`,
        );
      }
    });
  }

  // Envoie un email de vérification
  async sendVerificationEmail(user: User): Promise<void> {
    const token = this.generateToken(user.id, SecurityActionType.VERIFY_EMAIL);
    const template = this.templates.get(SecurityActionType.VERIFY_EMAIL);

    if (!template || !this.FRONTEND_URL) {
      throw new InternalServerErrorException('Configuration email incorrecte');
    }

    const verificationUrl = `${this.FRONTEND_URL}/verify-email?token=${token}`;
    const htmlContent = template({
      name: user.name,
      verificationUrl,
    });

    await this.emailService.sendEmail({
      to: user.email,
      subject: "Vérification de votre compte Circul'art",
      html: htmlContent,
    });
  }

  // Envoie un email de réinitialisation de mot de passe
  async sendPasswordResetEmail(email: string): Promise<{ message: string }> {
    const user = await this.usersRepository.findOne({ where: { email } });
    const message =
      'Si votre email est enregistré, vous recevrez un lien de réinitialisation.';

    if (!user) return { message };

    try {
      const token = this.generateToken(
        user.id,
        SecurityActionType.RESET_PASSWORD,
      );
      const template = this.templates.get(SecurityActionType.RESET_PASSWORD);

      if (!template || !this.FRONTEND_URL) {
        throw new InternalServerErrorException(
          'Configuration email incorrecte',
        );
      }

      const resetUrl = `${this.FRONTEND_URL}/reset-password?token=${token}`;
      const htmlContent = template({
        name: user.name,
        resetUrl,
      });

      await this.emailService.sendEmail({
        to: user.email,
        subject: "Réinitialisation de votre mot de passe Circul'art",
        html: htmlContent,
      });

      return { message };
    } catch (error: unknown) {
      console.error(
        `Erreur d'envoi d'email à ${email}: ${getErrorMessage(error)}`,
      );
      return { message };
    }
  }

  // Vérifie l'email d'un utilisateur
  async verifyEmail(token: string): Promise<{ message: string }> {
    try {
      const { userId } = this.verifyToken(
        token,
        SecurityActionType.VERIFY_EMAIL,
      );
      const user = await this.usersRepository.findOne({
        where: { id: userId },
      });

      if (!user) throw new BadRequestException('Utilisateur non trouvé');
      if (user.isVerified) return { message: 'Votre compte est déjà vérifié' };

      user.isVerified = true;
      await this.usersRepository.save(user);

      return {
        message: 'Vérification réussie. Vous pouvez maintenant vous connecter.',
      };
    } catch (error: unknown) {
      if (error instanceof BadRequestException) throw error;
      throw new BadRequestException('Lien de vérification invalide');
    }
  }

  // Réinitialise le mot de passe
  async resetPassword(
    token: string,
    newPassword: string,
  ): Promise<{ message: string }> {
    try {
      // Vérifier si le token a déjà été utilisé
      if (this.usedTokens.has(token)) {
        throw new BadRequestException(
          'Ce lien de réinitialisation a déjà été utilisé',
        );
      }

      // Valide le token
      const { userId } = this.verifyToken(
        token,
        SecurityActionType.RESET_PASSWORD,
      );

      await this.validatePassword(newPassword);

      const user = await this.usersRepository.findOne({
        where: { id: userId },
      });

      if (!user) throw new BadRequestException('Utilisateur non trouvé');

      // Utilise la classe utilitaire pour générer le hash et le salt
      const { hashedPassword, salt } =
        PasswordUtils.hashNewPassword(newPassword);

      // Met à jour l'utilisateur
      user.password = hashedPassword;
      user.salt = salt;
      await this.usersRepository.save(user);

      // Marque le token comme utilisé
      this.usedTokens.add(token);

      return {
        message:
          'Mot de passe réinitialisé avec succès. Vous pouvez maintenant vous connecter.',
      };
    } catch (error: unknown) {
      if (error instanceof BadRequestException) throw error;
      throw new BadRequestException(
        'Erreur lors de la réinitialisation du mot de passe: ' +
          getErrorMessage(error),
      );
    }
  }

  // Méthode de validation du mot de passe
  private async validatePassword(password: string): Promise<void> {
    const validation = plainToClass(PasswordValidation, { password });
    const errors = await validate(validation);

    if (errors.length > 0) {
      // Récupére le premier message d'erreur
      const constraints = errors[0].constraints;
      const message = constraints
        ? Object.values(constraints)[0]
        : 'Mot de passe invalide';
      throw new BadRequestException(message);
    }
  }

  // Valide un token JWT
  private verifyToken(
    token: string,
    expectedActionType: SecurityActionType,
  ): SecurityTokenPayload {
    if (!this.JWT_SECRET)
      throw new InternalServerErrorException('Clé JWT manquante');

    try {
      const decoded = jwt.verify(token, this.JWT_SECRET) as unknown;

      if (
        !decoded ||
        typeof decoded !== 'object' ||
        !('userId' in decoded) ||
        !('actionType' in decoded)
      ) {
        throw new BadRequestException('Format de token invalide');
      }

      const payload = decoded as SecurityTokenPayload;

      if (payload.actionType !== expectedActionType) {
        throw new BadRequestException(`Token non valide pour cette action`);
      }

      return payload;
    } catch (error: unknown) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new BadRequestException('Le token a expiré');
      }
      throw error instanceof BadRequestException
        ? error
        : new BadRequestException('Token invalide');
    }
  }

  // Génère un token JWT
  private generateToken(
    userId: string,
    actionType: SecurityActionType,
  ): string {
    if (!this.JWT_SECRET)
      throw new InternalServerErrorException('Clé JWT manquante');

    const expiresIn =
      actionType === SecurityActionType.RESET_PASSWORD ? '1h' : '24h';
    return jwt.sign({ userId, actionType }, this.JWT_SECRET, { expiresIn });
  }
}
