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
exports.findCounselorByUserId = exports.createCounselor = exports.findCounselors = void 0;
const counselor_model_1 = __importDefault(require("../model/counselor.model"));
function findCounselors(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return counselor_model_1.default.find(query);
    });
}
exports.findCounselors = findCounselors;
function createCounselor(input) {
    return __awaiter(this, void 0, void 0, function* () {
        return counselor_model_1.default.create(input);
    });
}
exports.createCounselor = createCounselor;
function findCounselorByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return counselor_model_1.default.findOne({ user: userId });
    });
}
exports.findCounselorByUserId = findCounselorByUserId;
