import { NestFactory } from '@nestjs/core';
import { AppModule } from './application/dependency-inversion/module/main.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Wallet Core')
    .setDescription('')
    .setVersion('1.0')
    .addTag('client')
    .addTag('account')
    .addTag('transaction')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, documentFactory);

  await app.listen(3000);
}
bootstrap();
