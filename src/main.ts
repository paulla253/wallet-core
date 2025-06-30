import { NestFactory } from '@nestjs/core';
import { AppModule } from './application/dependency-inversion/module/main.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { KafkaOptions, Transport } from '@nestjs/microservices';
import KafkaConfig from './infrastructure/config/kafka.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configKafka: KafkaOptions = {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: KafkaConfig.CLIENT_ID,
        brokers: [KafkaConfig.BROKER_URL],
        retry: {
          retries: 30,
          initialRetryTime: 10000,
          maxRetryTime: 5000,
        },
      },
      run: {
        autoCommit: false,
      },
    },
  };

  app.connectMicroservice(configKafka);
  await app.startAllMicroservices();

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
