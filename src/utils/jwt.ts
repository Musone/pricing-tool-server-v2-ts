import jwt from 'jsonwebtoken';
import config from 'config';

export function signJwt(
    object: Object,
    keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
    options?: jwt.SignOptions | undefined) {

    const privateKey = Buffer.from(config.get<string>(keyName), 'base64').toString('ascii');

    return jwt.sign(
        object,
        privateKey,
        {...(options && options), algorithm: 'RS256'}
    );
}

export function verifyJwt<T>(token: string, keyName: 'accessTokenPublicKey' | 'refreshTokenPublicKey'): T | null {
    const publicKey = Buffer.from(config.get<string>(keyName), 'base64').toString('ascii');

    try {
        return jwt.verify(token, publicKey) as T;
    } catch (e: any) {
        return null;
    }
}