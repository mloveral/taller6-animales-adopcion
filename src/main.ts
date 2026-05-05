import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableCors();

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API Adopciones')
    .setDescription('API para la gestión de adopción de animales')
    .addBearerAuth()
    .addServer('http://localhost:3000', 'local')
    .addServer('https://api.miapp.com', 'Producción')
    .setVersion('1.0')
    .addTag('animals', 'Endpoints para gestionar animales')
    .addTag('users', 'Endpoints para gestionar usuarios')
    .addTag(
      'adoption-requests',
      'Endpoints para gestionar solicitudes de adopción',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  logger.log(`Servidor en http://localhost:${port}`);
  logger.log(`Swagger en http://localhost:${port}/docs`);
}
bootstrap();
