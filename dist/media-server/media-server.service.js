"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MediaServerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaServerService = void 0;
const common_1 = require("@nestjs/common");
const NodeMediaServer = require("node-media-server");
let MediaServerService = MediaServerService_1 = class MediaServerService {
    constructor() {
        this.logger = new common_1.Logger(MediaServerService_1.name);
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
};
exports.MediaServerService = MediaServerService;
exports.MediaServerService = MediaServerService = MediaServerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MediaServerService);
//# sourceMappingURL=media-server.service.js.map