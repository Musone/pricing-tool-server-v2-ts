"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateResource_1 = __importDefault(require("../middleware/validateResource"));
const auth_schema_1 = require("../schema/auth.schema");
const auth_controller_1 = require("../controller/auth.controller");
const router = express_1.default.Router();
router.post('/api/sessions', (0, validateResource_1.default)(auth_schema_1.createSessionSchema), auth_controller_1.createSessionHandler);
router.post('/api/sessions/refresh', auth_controller_1.refreshAccessTokenHandler);
router.post('/api/sessions/logout', auth_controller_1.logoutHandler);
exports.default = router;
