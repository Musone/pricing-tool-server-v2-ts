export default {
    port: 5000,
    dbUri: 'mongodb://localhost:27017/pricing-tool-local',
    logLevel: 'info',
    accessTokenPrivateKey: '',
    accessTokenPublicKey: '',
    refreshTokenPrivateKey: '',
    refreshTokenPublicKey: '',
    accessTokenTTL: '30m',
    refreshTokenTTL: '1y',
    invalidLoginMessage: 'Invalid email or password',
    smtp: {
        user: 'ygx6wvan5es3a4rd@ethereal.email',
        pass: 'q8SJwBM4NK537CMB1W',
        host: 'smtp.ethereal.email', port: 587, secure: false
    },
    clientUrl: 'http://192.168.1.8:3000',
    uploadLocation: 'uploads/',
}
