import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Permitir CORS para el frontend móvil
  app.enableCors({
    origin: '*',
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
  });

  // ✅ Validación global de DTOs
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // ✅ Configurar Swagger
  const config = new DocumentBuilder()
    .setTitle('InfoMóvil API')
    .setDescription(
      'Ecosistema de APIs para el Taller Nº2 (NestJS + PostgreSQL + FastAPI + Express)',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // ✅ Iniciar servidor
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 API NestJS corriendo en http://localhost:${port}`);
  console.log(`📄 Swagger UI: http://localhost:${port}/docs`);
}
bootstrap();
