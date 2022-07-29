import {DocumentType, getModelForClass, index, modelOptions, pre, prop, Severity} from "@typegoose/typegoose";
import {nanoid} from "nanoid";
import argon2 from "argon2";
import log from "../utils/logger";
import Role from "../constants/userRoles.constants";

export const privateFields = [
    'password',
    '__v',
    'verificationCode',
    'passwordResetCode',
    'verified',
];

@pre<User>('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await argon2.hash(this.password);
    return;
})
@index({email: 1})
@modelOptions({
    schemaOptions: {
        timestamps: true
    },
    options: {
        allowMixed: Severity.ALLOW
    }
})
export class User {
    @prop({default: []})
    roles: Role[];

    @prop({lowercase: true, required: true, unique: true})
    email: string;

    @prop({required: true, lowercase: true, trim: true})
    firstName: string;

    @prop({required: true, lowercase: true, trim: true})
    lastName: string;

    @prop({required: true})
    password: string;

    @prop({required: true, default: () => nanoid()})
    verificationCode: string;

    @prop()
    passwordResetCode: string | null;

    @prop({default: false})
    verified: boolean;

    public async validatePassword(this: DocumentType<User>, candidatePassword: string): Promise<boolean> {
        try {
            return await argon2.verify(this.password, candidatePassword);
        } catch (e: any) {
            log.error(e, "Could not validate password");
            return false;
        }
    }
}

const UserModel = getModelForClass(User);

export default UserModel;