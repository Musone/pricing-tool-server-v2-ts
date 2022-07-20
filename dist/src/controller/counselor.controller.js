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
exports.putCounselorHandler = exports.getCounselorsHandler = exports.getMyCounselorProfileHandler = void 0;
const counselor_service_1 = require("../service/counselor.service");
const counselor_helper_1 = require("../helper/counselor.helper");
const UpdateAndReplaceObject_1 = __importDefault(require("../utils/UpdateAndReplaceObject"));
const utils_1 = require("@typegoose/typegoose/lib/internal/utils");
const fs_1 = __importDefault(require("fs"));
const config_1 = __importDefault(require("config"));
const logger_1 = __importDefault(require("../utils/logger"));
const lodash_1 = require("lodash");
function getMyCounselorProfileHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = res.locals.user;
        const counselorProfile = yield (0, counselor_service_1.findCounselorByUserId)(user._id);
        if ((0, lodash_1.isNull)(counselorProfile))
            return res.sendStatus(404);
        return res.send(counselorProfile);
    });
}
exports.getMyCounselorProfileHandler = getMyCounselorProfileHandler;
function getCounselorsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const refinedQuery = (0, counselor_helper_1.refineQuery)((0, counselor_helper_1.parseQuery)(req.query));
        // console.debug(JSON.stringify({refinedQuery}, null, 2)  );
        // console.debug('logging from counselor.controller.ts');
        return res.send(yield (0, counselor_service_1.findCounselors)(refinedQuery));
    });
}
exports.getCounselorsHandler = getCounselorsHandler;
function putCounselorHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = res.locals.user;
        const input = req.body;
        const counselorProfile = yield (0, counselor_service_1.findCounselorByUserId)(user._id);
        if (!counselorProfile) {
            input.user = user._id;
            input.firstName = user.firstName;
            input.lastName = user.lastName;
            try {
                yield (0, counselor_service_1.createCounselor)(input);
                return res.send('Your counselor profile was successfuly created');
            }
            catch (e) {
                return res.status(400).send(e.message);
            }
        }
        else {
            // Todo: this will override counselors trying to change their first name and last name.
            input.firstName = user.firstName;
            input.lastName = user.lastName;
            if (!(0, utils_1.isNullOrUndefined)(counselorProfile.pfp) && !(0, utils_1.isNullOrUndefined)(input.pfp) && input.pfp !== counselorProfile.pfp) {
                const path = config_1.default.get('uploadLocation');
                fs_1.default.rm(`${path}${counselorProfile.pfp}`, (err) => {
                    if (!(0, lodash_1.isNull)(err)) {
                        logger_1.default.error(err);
                    }
                });
            }
            // updateAndAddToObject(input, counselorProfile);
            (0, UpdateAndReplaceObject_1.default)(input, counselorProfile);
            yield counselorProfile.save();
            return res.send('Your counselor profile was successfuly updated');
        }
    });
}
exports.putCounselorHandler = putCounselorHandler;
