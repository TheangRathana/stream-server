import { MediaServerService } from './media-server.service';
export declare class MediaServerController {
    private readonly mediaServerService;
    constructor(mediaServerService: MediaServerService);
    getActiveStreams(): {
        streams: any[];
        rtmpUrl: string;
        hlsUrl: string;
    };
}
