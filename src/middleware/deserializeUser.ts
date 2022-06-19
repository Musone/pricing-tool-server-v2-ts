import {NextFunction, Request, Response} from "express";
import {verifyJwt} from "../utils/jwt";
import {refreshAccessToken} from "../service/auth.service";


/**
 * Gets the access token from the header,
 * then decodes/verifies the token,
 * then attaches the user to the res.local property.
 */
const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = (req.headers.authorization || '').replace(/^Bearer\s/, '');
    const refreshToken = req.headers['x-refresh'] as string || '';

    if (!accessToken) return next();

    const decoded = verifyJwt(accessToken, 'accessTokenPublicKey');
    if (decoded) res.locals.user = decoded;

    return next();
}

export default deserializeUser;