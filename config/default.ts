export default {
    port: 3000,
    dbUri: 'mongodb://localhost:27017/pricing-tool-local',
    logLevel: 'info',
    accessTokenPrivateKey: '',
    accessTokenPublicKey: '',
    refreshTokenPrivateKey: '',
    refreshTokenPublicKey: '',
    accessTokenTTL: '15m',
    refreshTokenTTL: '1y',
    invalidLoginMessage: 'Invalid email or password',
    smtp: {
        user: 'ojef2gf3hyl6iknd@ethereal.email',
        pass: 'ScMGkJ6EKq7hRhtTd1',
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false
    },
}