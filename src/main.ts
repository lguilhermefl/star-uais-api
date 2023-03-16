import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: [
        'http://localhost:5173',
        'https://star-uais-front.vercel.app',
        'https://star-uais-jyt427afo-lguilhermefl.vercel.app',
      ],
      preflightContinue: false,
    },
  });
  app.useGlobalPipes(new ValidationPipe());
  const logger = new Logger('main');
  const configService = app.get(ConfigService);
  const PORT = configService.get<string>('PORT') ?? '3000';
  await app.listen(PORT, () => logger.log(`Server is running on port ${PORT}`));
}
bootstrap();
