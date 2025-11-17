import * as dotenv from 'dotenv'; // <--- LÍNEA 1
dotenv.config(); // <--- LÍNEA 2

// --- 3. AÑADE EL DEBUG AQUÍ ARRIBA ---
console.log("--- DEBUGGING .env (PRE-BOOTSTRAP) ---");
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASS:", process.env.DB_PASS); // <-- La línea clave
console.log("DB_NAME:", process.env.DB_NAME);
console.log("-------------------------------------");
// --- FIN DEL BLOQUE DE DEBUG ---

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
// (Ya no necesitas importar ConfigService aquí)

async function bootstrap() {
  // El .env ya fue cargado por dotenv.config()
  const app = await NestFactory.create(AppModule);

  // (Borra el bloque de app.get(ConfigService) que te di antes, ya no es necesario)

  // ✅ Permitir CORS para el frontend móvil
  app.enableCors({
    origin: '*',
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
  });

  // ... (el resto de tu archivo main.ts sigue igual) ...
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const config = new DocumentBuilder()
    .setTitle('InfoMóvil API')
    // ...
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 API NestJS corriendo en http://localhost:${port}`);
  console.log(`📄 Swagger UI: http://localhost:${port}/docs`);
}
bootstrap();