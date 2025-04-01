import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as session from 'express-session';
import * as passport from 'passport';
import * as crypto from 'crypto';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Ajoutez cette ligne si elle n'existe pas déjà
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      disableErrorMessages: false,
    }),
  );

  const cookieName = `ca_sid_${crypto.createHash('sha256').update('circul-art-salt').digest('hex').substring(0, 8)}`;

  // Vérification de la variable d'environnement SESSION_SECRET
  if (!process.env.SESSION_SECRET) {
    console.error("ATTENTION: La variable SESSION_SECRET n'est pas définie");
    process.exit(1);
  }

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      name: cookieName,
      cookie: {
        maxAge: 3600000, // 1 heure en millisecondes
        secure: process.env.NODE_ENV === 'production', // Utiliser HTTPS en production
        httpOnly: true,
        sameSite: 'lax',
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Circul-art API')
    .setDescription('The Circul-art API documentation')
    .setVersion('1.0')
    .addCookieAuth(cookieName, {
      type: 'apiKey',
      in: 'cookie',
      name: cookieName,
      description: 'Session cookie for authentication',
    })
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
