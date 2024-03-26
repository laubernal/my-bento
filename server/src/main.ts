import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { EventBus } from '@nestjs/cqrs';
import { AppEventBus } from 'Shared/Domain/Entities/AppEventBus';
import { ErrorsInterceptor } from 'Shared/Infrastructure/Interceptor/ErrorInterceptor';
import App from './App';
import CookieSession from 'cookie-session';

async function bootstrap() {
  const app = await NestFactory.create(App);

  const config = app.get(ConfigService);
  const eventBus = app.get(EventBus);

  AppEventBus.instance(eventBus);

  app.use(
    CookieSession({
      name: 'app-session',
      secret: config.get('JWT_KEY'),
      maxAge: 24 * 60 * 60 * 1000,
      signed: false,
      secure: false,
      httpOnly: false,
    })
  );

  app.useGlobalInterceptors(new ErrorsInterceptor());

  app.enableVersioning({
    type: VersioningType.URI,
  });

  // app.setGlobalPrefix('api/v1');

  await app.listen(5000);
}

bootstrap();
