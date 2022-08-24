module.exports = {
    port: 5000,

    // ~~ Ethermail (fake email) ~~
    dbUri: 'mongodb://localhost:27017/pricing-tool-local',
    smtp: {
        service: 'ethermail',
        user: 'ygx6wvan5es3a4rd@ethereal.email',
        pass: 'q8SJwBM4NK537CMB1W',
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
    },
    // ~~~~

    logLevel: 'info',
    accessTokenPrivateKey: '',
    accessTokenPublicKey: '',
    refreshTokenPrivateKey: '',
    refreshTokenPublicKey: '',
    accessTokenTTL: '30m',
    refreshTokenTTL: '1y',
    invalidLoginMessage: 'Invalid email or password',
    clientUrl: 'http://192.168.1.8:3000',
    uploadLocation: 'uploads/',
    something: 'test',
}
