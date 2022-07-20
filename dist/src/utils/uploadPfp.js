"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@typegoose/typegoose/lib/internal/utils");
const nanoid_1 = require("nanoid");
const fs_1 = __importDefault(require("fs"));
const lodash_1 = require("lodash");
const config_1 = __importDefault(require("config"));
const logger_1 = __importDefault(require("./logger"));
function uploadPfp(req, res, next) {
    if (!(0, utils_1.isNullOrUndefined)(req.body.pfp)) {
        const path = config_1.default.get('uploadLocation');
        const name = (0, nanoid_1.nanoid)();
        const extension = '.jpg';
        const base64input = req.body.pfp.split(',');
        const base64header = base64input[0];
        const base64payload = base64input[1];
        return fs_1.default.writeFile(`${path}${name}${extension}`, base64payload, 'base64', (err) => {
            if ((0, lodash_1.isNull)(err)) {
                req.body.pfp = `${name}${extension}`;
                return next();
            }
            else {
                logger_1.default.error(err);
                return res.sendStatus(500);
            }
        });
    }
    else {
        return next();
    }
}
exports.default = uploadPfp;
