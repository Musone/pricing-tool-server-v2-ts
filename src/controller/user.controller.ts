import {Request, Response} from "express";
import {
    CreateUserInput,
    ForgotPasswordInput,
    PutUserInput,
    ResetPasswordInput,
    VerifyUserInput
} from "../schema/user.schema";
import {
    createUser,
    deleteUserById,
    findUserByEmail,
    findUserById,
    getAllUsers
} from "../service/user.service";
import sendEmail from "../utils/mailer";
import log from "../utils/logger";
import {nanoid} from "nanoid";
import UserModel, {privateFields, User} from "../model/user.model";
import {DocumentType} from "@typegoose/typegoose";
import updateAndAddToObject from "../utils/UpdateAndAddToObject";
import config from "config";
import {omit} from "lodash";
import updateAndReplaceObject from "../utils/UpdateAndReplaceObject";
import {isNullOrUndefined} from "@typegoose/typegoose/lib/internal/utils";
import {deleteCounselorByUserId} from "../service/counselor.service";
import {deleteSessionsByUserId} from "../service/auth.service";
import sendVerificationEmail from "../utils/sendVerificationEmail";

export async function getUsersHandler(req: Request, res: Response) {
    const id: any = req.query['id'];

    try {
        let userList = [];

        if (typeof id === 'undefined' || id === null) {
            userList = await getAllUsers();
        } else {
            const user = await findUserById(id);
            if (user !== null) {
                userList.push(user);
            }
        }

        const userListTransformed = userList.map((user) => omit(user.toJSON(), privateFields));
        return res.send(userListTransformed);
    } catch (e: any) {
        return res.status(500).send(e)
    }
}

export async function putUserHandler(req: Request<PutUserInput['params'], {}, PutUserInput['body']>, res: Response) {
    const {id} = req.params;
    const input = req.body/*as Partial<User>*/;
    const user: DocumentType<User> | null = await UserModel.findById(id);

    if (!user) return res.status(400).send('Could not update user');

    updateAndReplaceObject(input, user);

    try {
        await user.save();
    } catch (e: any) {
        // log.error(e);

        if (e.code === 11000) {
            return res.status(409).send('Email taken')
        } else {
            return res.sendStatus(400);
        }
    }

    return res.send('User roles successfully updated');
}

export async function createUserHandler(req: Request<{}, {}, CreateUserInput>, res: Response) {
    const body: CreateUserInput = req.body;
    const clientUrl = config.get<string>('clientUrl');

    try {
        const user = await createUser(body);

        if (isNullOrUndefined(body.verified)) {
            await sendVerificationEmail(clientUrl, user);
        }

        return res.send('User successfully created');
    } catch (e: any) {
        if (e.code === 11000) return res.status(409).send('Email already exists');

        return res.status(500).send(e);
    }

}

export async function verifyUserHandler(req: Request<VerifyUserInput>, res: Response) {
    const {id, verificationCode}: VerifyUserInput = req.params;

    const user = await findUserById(id);

    if (!user) return res.status(401).send('Could not verify user');

    if (user.verified) return res.send('User is already verified');

    if (user.verificationCode === verificationCode) {
        user.verified = true;
        await user.save();
        return res.send('User successfully verified');
    }

    return res.status(401).send('Verification code invalid');
}

export async function forgotPasswordHandler(req: Request<{}, {}, ForgotPasswordInput>, res: Response) {
    const {email} = req.body;
    const message = 'A reset email has been sent';
    const user = await findUserByEmail(email);
    const clientUrl = config.get<string>('clientUrl');

    if (!user) {
        log.debug(`User with email ${email} does not exist`);
        return res.send(message);
    }

    if (!user.verified) return res.send(message);

    user.passwordResetCode = nanoid();

    await user.save();

    const resetLink = `${clientUrl}/auth/forgotPassword?id=${user._id}&code=${user.passwordResetCode}`;

    await sendEmail({
        from: 'admin@server.com',
        to: user.email,
        subject: 'Password reset',
        html: `<h3>Reset your password with the url below</h3><a href="${resetLink}">${resetLink}</a>`
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

export async function deleteUserByIdHandler(req: Request, res: Response) {
    const id = req.params.id;

    if (isNullOrUndefined(id)) {
        return res.status(400).send('id parameter missing')
    }

    try {
        await deleteUserById(id);
        await deleteCounselorByUserId(id);
        await deleteSessionsByUserId(id);
    } catch (e: any) {
        return res.sendStatus(400);
    }

    return res.send('User successfully deleted.');
}



