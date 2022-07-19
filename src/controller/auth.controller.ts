import {Request, Response} from "express";
import {CreateSessionInput} from "../schema/auth.schema";
import config from "config";
import {findUserByEmail, findUserById} from "../service/user.service";
import {
    deleteSessionById,
    findSessionById,
    findSessionByRefreshToken,
    refreshAccessToken,
    signAccessToken,
    signRefreshToken
} from "../service/auth.service";
import {verifyJwt} from "../utils/jwt";
import {DocumentType} from "@typegoose/typegoose";
import {Session} from "../model/session.model";

/**
 * Verifies login credentials and responds with an access token and a refresh token.
 * If the login credentials are incorrect, this handler will respond with a generic failed login message.
 * @param req
 * @param res
 */
export async function createSessionHandler(req: Request<{}, {}, CreateSessionInput>, res: Response) {
    const invalidMessage = config.get<string>('invalidLoginMessage');
    const {email, password} = req.body;
    const userAgent = req.headers["user-agent"] || '';

    if (password.length < 6) return res.status(401).send(invalidMessage)

    const user = await findUserByEmail(email);

    if (!user) return res.status(401).send(invalidMessage);

    const isValid = await user.validatePassword(password);

    if (!isValid) return res.status(401).send(invalidMessage);
    if (!user.verified) return res.status(401).send('Please verify your email');

    const accessToken = signAccessToken(user);
    const refreshToken = await signRefreshToken(user._id, userAgent);

    return res.status(200).send({
        accessToken,
        refreshToken
    });
}

/**
 * Decodes/verifies the refresh token and checks if the user session is still valid.
 * If it is still valid, responds with a new access token.
 * Otherwise, responds with an error.
 * @param req
 * @param res
 */
export async function refreshAccessTokenHandler(req: Request, res: Response) {
    const failedToRefreshMessage = 'Could not refresh access token';
    const refreshToken = req.headers['x-refresh'] as string || '';

    const accessToken = await refreshAccessToken(refreshToken);

    if (!accessToken) return res.status(401).send(failedToRefreshMessage);

    res.send({accessToken});
}

export async function logoutHandler(req: Request, res: Response) {
    const refreshToken = req.headers['x-refresh'] as string || '';

    if (!refreshToken) return res.send('No refresh token. Already signed out.');

    const decoded = verifyJwt<{ session: string }>(refreshToken, 'refreshTokenPublicKey');

    if (!decoded) return res.send('Refresh token invalid.')

    // ~~ Invalidate session instead of deleting it ~~
    // const session: DocumentType<Session> | null = await findSessionByRefreshToken(refreshToken);
    // if (session === null) return res.send('Session could not be retrieved.')
    // session.valid = false;

    try {
        // await session.save();
        await deleteSessionById(decoded.session);
    } catch (e) {
        return res.sendStatus(400);
    }

    return res.send('Session successfully expired.')
}