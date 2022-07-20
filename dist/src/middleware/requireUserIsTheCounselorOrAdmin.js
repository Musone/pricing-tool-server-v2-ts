"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userRoles_constants_1 = __importDefault(require("../constants/userRoles.constants"));
const requireUserIsTheCounselorOrAdmin = (req, res, next) => {
    const { id } = req.params;
    const user = res.locals.user;
    if (!user)
        throw new Error('requireUserIsCounselorOrAdmin called but no user is authenticated');
    const hasPermission = (user.roles.includes(userRoles_constants_1.default.COUNSELOR) && user._id === id) || user.roles.includes(userRoles_constants_1.default.ADMIN);
    if (!hasPermission)
        return res.sendStatus(403);
    return next();
};
exports.default = requireUserIsTheCounselorOrAdmin;
