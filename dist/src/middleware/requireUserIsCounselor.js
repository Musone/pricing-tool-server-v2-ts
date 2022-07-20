"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userRoles_constants_1 = __importDefault(require("../constants/userRoles.constants"));
const requireUserIsCounselor = (req, res, next) => {
    const user = res.locals.user;
    if (!user)
        throw new Error('requireUserIsAdmin called but no user is authenticated');
    if (!user.roles.includes(userRoles_constants_1.default.COUNSELOR)) {
        return res.status(403).send('User is not a counselor');
    }
    return next();
};
exports.default = requireUserIsCounselor;
