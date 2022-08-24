module.exports = {
    port: process.env.PORT,

    // ~~ Gmail ~~
    dbUri: 'mongodb+srv://Phare-Dev:XvJ9WmImAMQodvzM@pricing-tool.1nrux4k.mongodb.net/?retryWrites=true&w=majority',
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
