"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const requireUserIsAdmin_1 = __importDefault(require("./requireUserIsAdmin"));
const checkPutUserPermissions = (req, res, next) => {
    const { id } = req.params;
    const { roles } = req.body;
    const user = res.locals.user;
    if (!user)
        throw new Error('requireAdmin called but no user is authenticated');
    if (roles)
        return (0, requireUserIsAdmin_1.default)(req, res, next);
    if (user._id === id)
        return next();
    return res.sendStatus(401);
};
exports.default = checkPutUserPermissions;
