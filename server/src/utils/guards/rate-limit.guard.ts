import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request, Response } from 'express';
import { rateLimit, RateLimitRequestHandler } from 'express-rate-limit';
import * as requestIp from 'request-ip';

export const RATE_LIMIT_KEY = 'rate_limit';

export interface RateLimitConfig {
  windowMs: number; // Fenêtre de temps en millisecondes
  max: number; // Nombre maximum de requêtes dans cette fenêtre
  message?: string; // Message personnalisé (optionnel)
}

export const SetRateLimit = (config: RateLimitConfig) => {
  return (
    target: object,
    key?: string,
    descriptor?: PropertyDescriptor,
  ): PropertyDescriptor | undefined => {
    const metadata = (descriptor?.value as object) ?? target;
    Reflect.defineMetadata(RATE_LIMIT_KEY, config, metadata);
    return descriptor;
  };
};

@Injectable()
export class RateLimitGuard implements CanActivate {
  private readonly limiters = new Map<string, RateLimitRequestHandler>();
  private readonly defaultConfig: RateLimitConfig = {
    windowMs: 15 * 60 * 1000, // 15 minutes par défaut
    max: 100, // 100 requêtes par défaut
    message: 'Trop de requêtes, veuillez réessayer plus tard',
  };

  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    // Récupére le gestionnaire et la classe
    const handler = context.getHandler();
    const controller = context.getClass();

    // Cherche la configuration sur le gestionnaire d'abord, puis sur le contrôleur
    const config =
      this.reflector.get<RateLimitConfig>(RATE_LIMIT_KEY, handler) ||
      this.reflector.get<RateLimitConfig>(RATE_LIMIT_KEY, controller) ||
      this.defaultConfig;

    // Crée une clé unique pour cette configuration
    const key = `${controller.name}-${handler.name}`;

    // Crée ou récupére le limiteur pour cette route
    if (!this.limiters.has(key)) {
      this.limiters.set(
        key,
        rateLimit({
          windowMs: config.windowMs,
          max: config.max,
          message: { message: config.message || this.defaultConfig.message },
          standardHeaders: true,
          legacyHeaders: false,
          keyGenerator: (req) =>
            requestIp.getClientIp(req) || req.ip || 'ip-inconnue',
          skip: () => false,
        }),
      );
    }

    // Applique le limiteur
    const limiter = this.limiters.get(key);

    if (!limiter) {
      console.error(`Limiteur pour ${key} non trouvé`);
      return true;
    }

    return await new Promise<boolean>((resolve, reject) => {
      try {
        void limiter(request, response, () => {
          resolve(true);
        });
      } catch (error) {
        reject(error instanceof Error ? error : new Error(String(error)));
      }
    });
  }
}
