import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as NodeMediaServer from 'node-media-server';

@Injectable()
export class MediaServerService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(MediaServerService.name);
  private nms: any;

  constructor() {
    const config = {
      rtmp: {
        port: 1935,
        chunk_size: 60000,
        gop_cache: true,
        ping: 30,
        ping_timeout: 60
      },
      http: {
        port: 8000,
        allow_origin: '*'
      },
      trans: {
        ffmpeg: '/usr/bin/ffmpeg',
        tasks: [
          {
            app: 'live',
            hls: true,
            hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
            dash: true,
            dashFlags: '[f=dash:window_size=3:extra_window_size=5]'
          }
        ]
      }
    };

    this.nms = new NodeMediaServer(config);

    // Event handlers
    this.nms.on('preConnect', (id, args) => {
      this.logger.log('[NodeEvent on preConnect]', `id=${id} args=${JSON.stringify(args)}`);
    });

    this.nms.on('postConnect', (id, args) => {
      this.logger.log('[NodeEvent on postConnect]', `id=${id} args=${JSON.stringify(args)}`);
    });

    this.nms.on('doneConnect', (id, args) => {
      this.logger.log('[NodeEvent on doneConnect]', `id=${id} args=${JSON.stringify(args)}`);
    });

    this.nms.on('prePublish', (id, StreamPath, args) => {
      this.logger.log('[NodeEvent on prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
    });

    this.nms.on('postPublish', (id, StreamPath, args) => {
      this.logger.log('[NodeEvent on postPublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
    });

    this.nms.on('donePublish', (id, StreamPath, args) => {
      this.logger.log('[NodeEvent on donePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
    });

    this.nms.on('prePlay', (id, StreamPath, args) => {
      this.logger.log('[NodeEvent on prePlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
    });

    this.nms.on('postPlay', (id, StreamPath, args) => {
      this.logger.log('[NodeEvent on postPlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
    });

    this.nms.on('donePlay', (id, StreamPath, args) => {
      this.logger.log('[NodeEvent on donePlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
    });
  }

  onModuleInit() {
    this.nms.run();
    this.logger.log('Node Media Server started');
  }

  onModuleDestroy() {
    this.nms.stop();
    this.logger.log('Node Media Server stopped');
  }

  getActiveStreams() {
    const sessions = this.nms.getSession();
    const activeStreams = [];
    
    for (let session in sessions) {
      if (sessions[session].isStarting) {
        activeStreams.push({
          id: session,
          path: sessions[session].publishStreamPath,
          clientId: sessions[session].id
        });
      }
    }
    
    return activeStreams;
  }
}
