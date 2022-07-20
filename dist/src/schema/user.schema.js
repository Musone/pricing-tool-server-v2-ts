"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putUserSchema = exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.verifyUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
const userRoles_constants_1 = __importDefault(require("../constants/userRoles.constants"));
exports.createUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        firstName: (0, zod_1.string)({
            required_error: 'First name is required'
        }),
        lastName: (0, zod_1.string)({
            required_error: 'Last name is required'
        }),
        password: (0, zod_1.string)({
            required_error: 'Password is required'
        }).min(6, 'Password is too short. Should be at-least 6 characters'),
        passwordConfirmation: (0, zod_1.string)({
            required_error: 'Password confirmation is required'
        }),
        email: (0, zod_1.string)({
            required_error: 'Email is required'
        }).email('Not a valid email')
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: 'Passwords do not match',
        path: ['passwordConfirmation']
    })
});
exports.verifyUserSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        id: (0, zod_1.string)(),
        verificationCode: (0, zod_1.string)()
    })
});
exports.forgotPasswordSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        email: (0, zod_1.string)({
            required_error: 'Email required'
        }).email('Not a valid email'),
    })
});
exports.resetPasswordSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        id: (0, zod_1.string)(),
        passwordResetCode: (0, zod_1.string)()
    }),
    body: (0, zod_1.object)({
        password: (0, zod_1.string)({
            required_error: 'Password is required'
        }).min(6, 'Password is too short. Should be at-least 6 characters'),
        passwordConfirmation: (0, zod_1.string)({
            required_error: 'Password confirmation is required'
        }),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: 'Passwords do not match',
        path: ['passwordConfirmation']
    })
});
exports.putUserSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        id: (0, zod_1.string)()
    }),
    body: (0, zod_1.object)({
        roles: (0, zod_1.optional)((0, zod_1.array)((0, zod_1.string)().refine((data) => Object.values(userRoles_constants_1.default).includes(data)))),
        email: (0, zod_1.optional)((0, zod_1.string)().email({ message: 'Invalid email' })),
        firstName: (0, zod_1.optional)((0, zod_1.string)()),
        lastName: (0, zod_1.optional)((0, zod_1.string)()),
        password: (0, zod_1.optional)((0, zod_1.string)()),
        passwordConfirmation: (0, zod_1.optional)((0, zod_1.string)())
    }).refine((data) => {
        const { password, passwordConfirmation } = data;
        if (!password)
            return true;
        if (!passwordConfirmation)
            return false;
        return password === passwordConfirmation;
    }, {
        message: 'Passwords do not match',
        path: ['passwordConfirmation']
    })
});
const leanPutUserSchema = exports.putUserSchema.omit({ body: true }).extend({
    body: exports.putUserSchema.shape.body.innerType().omit({ passwordConfirmation: true })
});
