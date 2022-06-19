import {array, object, optional, string, TypeOf, undefined, union} from "zod";
import UserRoles from "../constants/userRoles.constants";


export const createUserSchema = object({
    body: object({
        firstName: string({
            required_error: 'First name is required'
        }),
        lastName: string({
            required_error: 'Last name is required'
        }),
        password: string({
            required_error: 'Password is required'
        }).min(6, 'Password is too short. Should be at-least 6 characters'),
        passwordConfirmation: string({
            required_error: 'Password confirmation is required'
        }),
        email: string({
            required_error: 'Email is required'
        }).email('Not a valid email')
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: 'Passwords do not match',
        path: ['passwordConfirmation']
    })
});

export const verifyUserSchema = object({
    params: object({
        id: string(),
        verificationCode: string()
    })
})

export const forgotPasswordSchema = object({
    body: object({
        email: string({
            required_error: 'Email required'
        }).email('Not a valid email'),
    })
})

export const resetPasswordSchema = object({
    params: object({
        id: string(),
        passwordResetCode: string()
    }),
    body: object({
        password: string({
            required_error: 'Password is required'
        }).min(6, 'Password is too short. Should be at-least 6 characters'),
        passwordConfirmation: string({
            required_error: 'Password confirmation is required'
        }),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: 'Passwords do not match',
        path: ['passwordConfirmation']
    })
})

export const putUserSchema = object({
    params: object({
        id: string()
    }),
    body: object({
        roles: optional(array(string().refine(
            (data) => Object.values(UserRoles).includes(data as UserRoles)
        ))),
        email: optional(string().email({message: 'Invalid email'})),
        firstName: optional(string()),
        lastName: optional(string()),
        password: optional(string()),
        passwordConfirmation: optional(string())
    }).refine(
        (data) => {
        const {password, passwordConfirmation} = data;
        if (!password) return true;
        if (!passwordConfirmation) return false;
        return password === passwordConfirmation;
    },
        {
        message: 'Passwords do not match',
        path: ['passwordConfirmation']
    })
})

const leanPutUserSchema = putUserSchema.omit({body: true}).extend({
    body: putUserSchema.shape.body.innerType().omit({passwordConfirmation: true})
});

export type CreateUserInput = TypeOf<typeof createUserSchema>['body'];
export type VerifyUserInput = TypeOf<typeof verifyUserSchema>['params'];
export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>['body'];
export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>;
export type PutUserInput = TypeOf<typeof leanPutUserSchema>;