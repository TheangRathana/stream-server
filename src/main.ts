import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`Application is running on: http://localhost:${port}`);
  Logger.log(`RTMP server is running on: rtmp://localhost:1935/live`);
}
bootstrap();
