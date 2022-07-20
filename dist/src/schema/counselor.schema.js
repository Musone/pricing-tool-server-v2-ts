"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putCounselorSchema = void 0;
const zod_1 = require("zod");
const zod_2 = require("zod");
const pronouns_constants_1 = __importDefault(require("../constants/pronouns.constants"));
const specializations_constants_1 = __importDefault(require("../constants/specializations.constants"));
const approaches_constants_1 = __importDefault(require("../constants/approaches.constants"));
const languages_constants_1 = __importDefault(require("../constants/languages.constants"));
const credentials_constants_1 = __importDefault(require("../constants/credentials.constants"));
const gender_constants_1 = __importDefault(require("../constants/gender.constants"));
const provinces_constants_1 = __importDefault(require("../constants/provinces.constants"));
// todo: editCounselorSchema
exports.putCounselorSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        id: (0, zod_1.string)({
            required_error: 'Id required'
        })
    }),
    body: (0, zod_1.object)({
        firstName: (0, zod_1.optional)((0, zod_1.string)()),
        lastName: (0, zod_1.optional)((0, zod_1.string)()),
        gender: (0, zod_1.optional)((0, zod_1.string)().refine((data) => gender_constants_1.default.includes(data))),
        age: (0, zod_1.optional)((0, zod_1.number)().min(19, 'Minimum age is 19').max(100, 'Maximum age is 100')),
        pronouns: (0, zod_1.optional)((0, zod_1.string)().refine((data) => pronouns_constants_1.default.includes(data))),
        in_person: (0, zod_1.optional)((0, zod_2.union)([
            (0, zod_1.object)({
                city: (0, zod_1.string)(),
                province: (0, zod_1.string)()
            }).refine((data) => { var _a; return (_a = provinces_constants_1.default[data.province]) === null || _a === void 0 ? void 0 : _a.includes(data.city); }),
            (0, zod_1.null)()
        ])),
        languages: (0, zod_1.optional)((0, zod_1.array)((0, zod_1.string)().refine((data) => languages_constants_1.default.includes(data)))),
        specializations: (0, zod_1.optional)((0, zod_1.array)((0, zod_1.string)().refine((data) => specializations_constants_1.default.includes(data)))),
        specializationDesc: (0, zod_1.optional)((0, zod_1.string)()),
        approach: (0, zod_1.optional)((0, zod_1.array)((0, zod_1.string)().refine((data) => approaches_constants_1.default.includes(data)))),
        approachDesc: (0, zod_1.optional)((0, zod_1.string)()),
        credentials: (0, zod_1.optional)((0, zod_1.array)((0, zod_1.string)().refine((data) => credentials_constants_1.default.includes(data)))),
        pfp: (0, zod_1.optional)((0, zod_1.string)()),
        descriptionLong: (0, zod_1.optional)((0, zod_1.string)()),
        introduction: (0, zod_1.optional)((0, zod_1.string)()),
        janeId: (0, zod_1.optional)((0, zod_2.union)([(0, zod_1.number)(), (0, zod_1.null)()])),
        counselling: (0, zod_1.optional)((0, zod_2.union)([
            (0, zod_1.object)({
                minPrice: (0, zod_1.number)().min(0, 'No negative price'),
                maxPrice: (0, zod_1.number)().min(0, 'No negative price')
            }),
            (0, zod_1.null)()
        ])),
        supervising: (0, zod_1.optional)((0, zod_2.union)([
            (0, zod_1.object)({
                minPrice: (0, zod_1.number)().min(0, 'No negative price'),
                maxPrice: (0, zod_1.number)().min(0, 'No negative price'),
                occupancy: (0, zod_1.number)().min(0, 'No negative occupancy')
            }),
            (0, zod_1.null)()
        ])),
    })
});
