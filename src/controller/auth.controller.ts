import {Request, Response} from "express";
import {CreateSessionInput} from "../schema/auth.schema";
import config from "config";
import {findUserByEmail, findUserById} from "../service/user.service";
import {findSessionById, refreshAccessToken, signAccessToken, signRefreshToken} from "../service/auth.service";
import {verifyJwt} from "../utils/jwt";

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

    const user = await findUserByEmail(email);

    if (!user) return res.send(invalidMessage);

    const isValid = await user.validatePassword(password);

    if (!isValid) return res.send(invalidMessage);
    if (!user.verified) return res.send('Please verify your email');

    const accessToken = signAccessToken(user);
    const refreshToken = await signRefreshToken(user._id, userAgent);

    return res.send({
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

    res.send({ accessToken });
}