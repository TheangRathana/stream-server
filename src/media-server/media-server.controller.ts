import { Controller, Get } from '@nestjs/common';
import { MediaServerService } from './media-server.service';

@Controller('streams')
export class MediaServerController {
  constructor(private readonly mediaServerService: MediaServerService) {}

  @Get()
  getActiveStreams() {
    return {
      streams: this.mediaServerService.getActiveStreams(),
      rtmpUrl: 'rtmp://localhost:1935/live',
      hlsUrl: 'http://localhost:8000/live',
    };
  }
}
