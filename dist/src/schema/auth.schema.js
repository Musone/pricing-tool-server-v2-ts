"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSessionSchema = void 0;
const zod_1 = require("zod");
const config_1 = __importDefault(require("config"));
const invalidMessage = config_1.default.get('invalidLoginMessage');
exports.createSessionSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        email: (0, zod_1.string)({ required_error: 'Email required' }).email(invalidMessage),
        password: (0, zod_1.string)({ required_error: 'Password required' }),
    })
});
