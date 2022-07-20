export default {
    // port: 5000,
    port: 8080,

    // ~~ Gmail ~~
    dbUri: 'mongodb+srv://Musone:4U2N1jDhrmnC4Z8W@pricingtool-cluster.yjalx.mongodb.net/?retryWrites=true&w=majority',
    smtp: {
        service: 'gmail',
        user: process.env.USER,
        pass: process.env.PASS,
        host: 'smtp.gmail.com',
        port: 465,
        secure: false,
    },
    // ~~~~

    // ~~ Heroku ~~
    logLevel: 'info',
    accessTokenPrivateKey: '',
    accessTokenPublicKey: '',
    refreshTokenPrivateKey: '',
    refreshTokenPublicKey: '',
    accessTokenTTL: '30m',
    refreshTokenTTL: '1y',
    invalidLoginMessage: 'Invalid email or password',
    clientUrl: 'https://phare-counselor-finding-tool.herokuapp.com',
    uploadLocation: 'uploads/',
    // ~~~~
}
