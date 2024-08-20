import { type INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { APP_LICENSE, APP_NAME, APP_VERSION } from '../constants/constants';

export const swaggerSetup = (app: INestApplication<any>): void => {
  const config = new DocumentBuilder()
    .setTitle(APP_NAME || 'Routinely API')
    .setVersion(APP_VERSION || '0.0.1')
    .addBearerAuth({
      name: 'x-access-token',
      type: 'apiKey',
      in: 'header',
    })
    .setLicense(`${APP_LICENSE} license`, 'https://github.com/RoutinelyOrganization/routinely-api/blob/develop/LICENSE')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};
