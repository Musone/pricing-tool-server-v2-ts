"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userRoles_constants_1 = __importDefault(require("../constants/userRoles.constants"));
/**
 * Checks if the currently authenticated user is an admin.
 * This middleware must be used after requireUser. If it is not, this function will throw a run-time error.
 * If user is an admin, passes request to the next callback.
 * Otherwise, responds with an HTTP error.
 * @param req
 * @param res
 * @param next
 */
const requireUserIsAdmin = (req, res, next) => {
    const user = res.locals.user;
    if (!user)
        throw new Error('requireUserIsAdmin called but no user is authenticated');
    const isAdmin = user.roles.includes(userRoles_constants_1.default.ADMIN);
    if (!isAdmin)
        return res.sendStatus(403);
    return next();
};
exports.default = requireUserIsAdmin;
