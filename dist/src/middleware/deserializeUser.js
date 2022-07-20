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
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("../utils/jwt");
/**
 * Gets the access token from the header,
 * then decodes/verifies the token,
 * then attaches the user to the res.local property.
 */
const deserializeUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = (req.headers.authorization || '').replace(/^Bearer\s/, '');
    const refreshToken = req.headers['x-refresh'] || '';
    if (!accessToken)
        return next();
    const decoded = (0, jwt_1.verifyJwt)(accessToken, 'accessTokenPublicKey');
    if (decoded)
        res.locals.user = decoded;
    return next();
});
exports.default = deserializeUser;
