import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
export declare class MediaServerService implements OnModuleInit, OnModuleDestroy {
    private readonly logger;
    private nms;
    constructor();
    onModuleInit(): void;
    onModuleDestroy(): void;
    getActiveStreams(): any[];
}
