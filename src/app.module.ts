import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MediaServerModule } from './media-server/media-server.module';

@Module({
  imports: [MediaServerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
