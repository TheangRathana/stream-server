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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaServerController = void 0;
const common_1 = require("@nestjs/common");
const media_server_service_1 = require("./media-server.service");
let MediaServerController = class MediaServerController {
    constructor(mediaServerService) {
        this.mediaServerService = mediaServerService;
    }
    getActiveStreams() {
        return {
            streams: this.mediaServerService.getActiveStreams(),
            rtmpUrl: 'rtmp://localhost:1935/live',
            hlsUrl: 'http://localhost:8000/live',
        };
    }
};
exports.MediaServerController = MediaServerController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MediaServerController.prototype, "getActiveStreams", null);
exports.MediaServerController = MediaServerController = __decorate([
    (0, common_1.Controller)('streams'),
    __metadata("design:paramtypes", [media_server_service_1.MediaServerService])
], MediaServerController);
//# sourceMappingURL=media-server.controller.js.map