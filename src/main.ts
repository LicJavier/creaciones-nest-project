import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as hbs from 'hbs';
import { SwaggerModule } from '@nestjs/swagger';
import { DocumentBuilder } from '@nestjs/swagger/dist';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule,{
  logger: ['error', 'warn'],
});
  
  //HANDLEBARS
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  hbs.registerPartials(join(__dirname, '..', '/views/partials'));
  app.set('view options', { layout: './layouts/main' });
  
  //SWAGGER
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Creaciones')
    .setDescription('The mandalas API')
    .setVersion('1.0')
    .addTag('Mandalas')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //PUERTO DE APLICACION
  await app.listen(8080,()=>{
    console.log('servidor en linea')
  });
}
bootstrap();
