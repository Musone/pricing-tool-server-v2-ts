import {privateFields, User} from "../model/user.model";
import {DocumentType} from "@typegoose/typegoose";
import {omit} from 'lodash';
import {signJwt, verifyJwt} from "../utils/jwt";
import SessionModel from "../model/session.model";
import config from "config";
import {findUserById} from "./user.service";


export async function findSessionById(id: string) {
    return SessionModel.findById(id);
}

export async function createSession(userId: string, userAgent: string) {
    return SessionModel.create({user: userId, userAgent});
}

export function signAccessToken(user: DocumentType<User>) {
    const timeToLive = config.get<string>('accessTokenTTL');
    const payload = omit(user.toJSON(), privateFields);
    return signJwt(payload, 'accessTokenPrivateKey', {expiresIn: timeToLive});
}

export async function signRefreshToken(userId: string, userAgent: string) {
    const timeToLive = config.get<string>('refreshTokenTTL');
    const session = await createSession(userId, userAgent);
    return signJwt({session: session._id}, 'refreshTokenPrivateKey', {expiresIn: timeToLive});
}

export async function refreshAccessToken(refreshToken: string) {
    const decoded = verifyJwt<{session: string}>(refreshToken, 'refreshTokenPublicKey');

    if (!decoded) return null;

    const session = await findSessionById(decoded.session);

    if (!session || !session.valid) return null;

    const user = await findUserById(String(session.user));

    if (!user) return null;

    return signAccessToken(user);
}