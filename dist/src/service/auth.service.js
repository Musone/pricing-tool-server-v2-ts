"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSessionById = exports.findSessionByRefreshToken = exports.refreshAccessToken = exports.signRefreshToken = exports.signAccessToken = exports.createSession = exports.findSessionById = void 0;
const user_model_1 = require("../model/user.model");
const lodash_1 = require("lodash");
const jwt_1 = require("../utils/jwt");
const session_model_1 = __importDefault(require("../model/session.model"));
const config_1 = __importDefault(require("config"));
const user_service_1 = require("./user.service");
function findSessionById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return session_model_1.default.findById(id);
    });
}
exports.findSessionById = findSessionById;
function createSession(userId, userAgent) {
    return __awaiter(this, void 0, void 0, function* () {
        return session_model_1.default.create({ user: userId, userAgent });
    });
}
exports.createSession = createSession;
function signAccessToken(user) {
    const timeToLive = config_1.default.get('accessTokenTTL');
    const payload = (0, lodash_1.omit)(user.toJSON(), user_model_1.privateFields);
    return (0, jwt_1.signJwt)(payload, 'accessTokenPrivateKey', { expiresIn: timeToLive });
}
exports.signAccessToken = signAccessToken;
function signRefreshToken(userId, userAgent) {
    return __awaiter(this, void 0, void 0, function* () {
        const timeToLive = config_1.default.get('refreshTokenTTL');
        const session = yield createSession(userId, userAgent);
        return (0, jwt_1.signJwt)({ session: session._id }, 'refreshTokenPrivateKey', { expiresIn: timeToLive });
    });
}
exports.signRefreshToken = signRefreshToken;
function refreshAccessToken(refreshToken) {
    return __awaiter(this, void 0, void 0, function* () {
        const decoded = (0, jwt_1.verifyJwt)(refreshToken, 'refreshTokenPublicKey');
        if (!decoded)
            return null;
        const session = yield findSessionById(decoded.session);
        if (!session || !session.valid)
            return null;
        const user = yield (0, user_service_1.findUserById)(String(session.user));
        if (!user)
            return null;
        return signAccessToken(user);
    });
}
exports.refreshAccessToken = refreshAccessToken;
function findSessionByRefreshToken(refreshToken) {
    return __awaiter(this, void 0, void 0, function* () {
        const decoded = (0, jwt_1.verifyJwt)(refreshToken, 'refreshTokenPublicKey');
        if (!decoded)
            return null;
        const session = yield findSessionById(decoded.session);
        if (session === null)
            return null;
        return session;
    });
}
exports.findSessionByRefreshToken = findSessionByRefreshToken;
function deleteSessionById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return session_model_1.default.deleteOne({ _id: id });
    });
}
exports.deleteSessionById = deleteSessionById;
