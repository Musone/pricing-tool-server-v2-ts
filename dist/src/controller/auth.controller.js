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
exports.logoutHandler = exports.refreshAccessTokenHandler = exports.createSessionHandler = void 0;
const config_1 = __importDefault(require("config"));
const user_service_1 = require("../service/user.service");
const auth_service_1 = require("../service/auth.service");
const jwt_1 = require("../utils/jwt");
/**
 * Verifies login credentials and responds with an access token and a refresh token.
 * If the login credentials are incorrect, this handler will respond with a generic failed login message.
 * @param req
 * @param res
 */
function createSessionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const invalidMessage = config_1.default.get('invalidLoginMessage');
        const { email, password } = req.body;
        const userAgent = req.headers["user-agent"] || '';
        if (password.length < 6)
            return res.status(401).send(invalidMessage);
        const user = yield (0, user_service_1.findUserByEmail)(email);
        if (!user)
            return res.status(401).send(invalidMessage);
        const isValid = yield user.validatePassword(password);
        if (!isValid)
            return res.status(401).send(invalidMessage);
        if (!user.verified)
            return res.status(401).send('Please verify your email');
        const accessToken = (0, auth_service_1.signAccessToken)(user);
        const refreshToken = yield (0, auth_service_1.signRefreshToken)(user._id, userAgent);
        return res.status(200).send({
            accessToken,
            refreshToken
        });
    });
}
exports.createSessionHandler = createSessionHandler;
/**
 * Decodes/verifies the refresh token and checks if the user session is still valid.
 * If it is still valid, responds with a new access token.
 * Otherwise, responds with an error.
 * @param req
 * @param res
 */
function refreshAccessTokenHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const failedToRefreshMessage = 'Could not refresh access token';
        const refreshToken = req.headers['x-refresh'] || '';
        const accessToken = yield (0, auth_service_1.refreshAccessToken)(refreshToken);
        if (!accessToken)
            return res.status(401).send(failedToRefreshMessage);
        res.send({ accessToken });
    });
}
exports.refreshAccessTokenHandler = refreshAccessTokenHandler;
function logoutHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const refreshToken = req.headers['x-refresh'] || '';
        if (!refreshToken)
            return res.send('No refresh token. Already signed out.');
        const decoded = (0, jwt_1.verifyJwt)(refreshToken, 'refreshTokenPublicKey');
        if (!decoded)
            return res.send('Refresh token invalid.');
        // ~~ Invalidate session instead of deleting it ~~
        // const session: DocumentType<Session> | null = await findSessionByRefreshToken(refreshToken);
        // if (session === null) return res.send('Session could not be retrieved.')
        // session.valid = false;
        try {
            // await session.save();
            yield (0, auth_service_1.deleteSessionById)(decoded.session);
        }
        catch (e) {
            return res.sendStatus(400);
        }
        return res.send('Session successfully expired.');
    });
}
exports.logoutHandler = logoutHandler;
