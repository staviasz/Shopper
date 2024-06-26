import { type INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swaggerSetup = (app: INestApplication<any>): void => {
  const config = new DocumentBuilder()
    .setTitle('Routnely API')
    .setVersion('0.0.1')
    .addBearerAuth({
      name: 'x-access-token',
      type: 'apiKey',
      in: 'header',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};
