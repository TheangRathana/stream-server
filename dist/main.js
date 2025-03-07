"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const port = process.env.PORT || 3000;
    await app.listen(port);
    common_1.Logger.log(`Application is running on: http://localhost:${port}`);
    common_1.Logger.log(`RTMP server is running on: rtmp://localhost:1935/live`);
}
bootstrap();
//# sourceMappingURL=main.js.map