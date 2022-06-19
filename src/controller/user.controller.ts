import {Request, Response} from "express";
import {
    CreateUserInput,
    ForgotPasswordInput,
    PutUserInput,
    ResetPasswordInput,
    VerifyUserInput
} from "../schema/user.schema";
import {createUser, findUserByEmail, findUserById} from "../service/user.service";
import sendEmail from "../utils/mailer";
import log from "../utils/logger";
import {nanoid} from "nanoid";
import Role from "../constants/userRoles.constants";
import UserModel, {User} from "../model/user.model";
import {DocumentType} from "@typegoose/typegoose";
import updateObject from "../utils/UpdateObject";


export async function putUserHandler(req: Request<PutUserInput['params'], {}, PutUserInput['body']>, res: Response) {
    const {id} = req.params;
    const input = req.body/*as Partial<User>*/;
    const user: DocumentType<User> | null = await UserModel.findById(id);

    if (!user) return res.status(400).send('Could update user');

    updateObject(input, user);

    await user.save();

    return res.send('User roles successfully updated');
}

export async function createUserHandler(req: Request<{}, {}, CreateUserInput>, res: Response) {
    const body: CreateUserInput = req.body;

    try {
        const user = await createUser(body);

        await sendEmail({
            from: 'admin@server.com',
            to: user.email,
            subject: 'Please verify your account',
            text: `Verification code: \n${user.verificationCode}\n\n Id: ${user._id}`
        });

        return res.send('User successfully created');
    } catch (e: any) {
        if (e.code === 11000) return res.status(409).send('Email already exists');

        return res.status(500).send(e);
    }

}

export async function verifyUserHandler(req: Request<VerifyUserInput>, res: Response) {
    const {id, verificationCode}: VerifyUserInput = req.params;

    const user = await findUserById(id);

    if (!user) return res.send('Could not verify user');

    if (user.verified) return res.send('User is already verified');

    if (user.verificationCode === verificationCode) {
        user.verified = true;
        await user.save();
        return res.send('User successfully verified');
    }

    return res.send('Verification code invalid');
}

export async function forgotPasswordHandler(req: Request<{}, {}, ForgotPasswordInput>, res: Response) {
    const {email} = req.body;
    const message = 'A reset email has been sent';
    const user = await findUserByEmail(email);

    if (!user) {
        log.debug(`User with email ${email} does not exist`);
        return res.send(message);
    }

    if (!user.verified) return res.send('User is not verified');

    user.passwordResetCode = nanoid();

    await user.save();

    await sendEmail({
        from: 'admin@server.com',
        to: user.email,
        subject: 'Password reset',
        text: `Password reset code: \n${user.passwordResetCode}\n\n Id: ${user._id}`
    });

    return res.send(message);
}

export async function resetPasswordHandler(req: Request<ResetPasswordInput['params'], {}, ResetPasswordInput['body']>, res: Response) {
    const {id, passwordResetCode}: ResetPasswordInput['params'] = req.params;
    const {password}: ResetPasswordInput['body'] = req.body;

    const user: DocumentType<User> | null = await findUserById(id);

    if (!user || !user.passwordResetCode || user.passwordResetCode !== passwordResetCode)
        return res.status(400).send('Could not reset user password');

    user.passwordResetCode = null;
    user.password = password;
    await user.save();

    return res.send('Password successfully updated');
}

export async function getCurrentUserHandler(req: Request, res: Response) {
    return res.send(res.locals.user);
}