"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const connect_1 = __importDefault(require("./utils/connect"));
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const logger_1 = __importDefault(require("./utils/logger"));
const routes_1 = __importDefault(require("./routes"));
const deserializeUser_1 = __importDefault(require("./middleware/deserializeUser"));
const cors_1 = __importDefault(require("cors"));
// import bodyParser from 'body-parser';
const app = (0, express_1.default)();
const port = config_1.default.get('port');
app.use((0, cors_1.default)({
    origin: '*',
}));
app.use(express_1.default.json({ limit: '5mb' }));
app.use(deserializeUser_1.default);
app.use(routes_1.default);
app.use(express_1.default.static(config_1.default.get('uploadLocation')));
app.listen(port, () => {
    logger_1.default.info(`Server is being hosted at http://localhost:${port}`);
    (0, connect_1.default)().catch((e) => logger_1.default.error(e.messages));
});
