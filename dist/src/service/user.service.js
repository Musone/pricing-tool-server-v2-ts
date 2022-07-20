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
exports.findUserByEmail = exports.findUserById = exports.createUser = void 0;
const user_model_1 = __importDefault(require("../model/user.model"));
function createUser(input) {
    return __awaiter(this, void 0, void 0, function* () {
        return user_model_1.default.create(input);
    });
}
exports.createUser = createUser;
function findUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return user_model_1.default.findById(id);
    });
}
exports.findUserById = findUserById;
function findUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        return user_model_1.default.findOne({ email });
    });
}
exports.findUserByEmail = findUserByEmail;
// export async function updateUser(userId: string, input: Partial<User>) {
//     const {roles, email, firstName, lastName, password} = input;
//     return UserModel.updateOne(
//         {_id: userId}, {
//             $addToSet: (roles ? {roles} : {}),
//             $Set: {
//                 email:
//                     {
//                         $cond: {if: {$allElementsTrue: ['$email']}, then: email}
//                     }
//             },
//         }
//     )
// }
