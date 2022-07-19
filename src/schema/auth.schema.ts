import {object, string, TypeOf} from "zod";
import config from "config";

const invalidMessage = config.get<string>('invalidLoginMessage');

export const createSessionSchema = object({
    body: object({
        email: string({required_error: 'Email required'}).email(invalidMessage),
        password: string({required_error: 'Password required'}),
    })
})

export type CreateSessionInput = TypeOf<typeof createSessionSchema>['body'];