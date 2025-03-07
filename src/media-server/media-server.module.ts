import { Module } from '@nestjs/common';
import { MediaServerService } from './media-server.service';
import { MediaServerController } from './media-server.controller';

@Module({
  providers: [MediaServerService],
  controllers: [MediaServerController],
  exports: [MediaServerService],
})
export class MediaServerModule {}
