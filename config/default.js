module.exports = {
    port: 8080,
    dbUri: 'mongodb+srv://Musone:4U2N1jDhrmnC4Z8W@pricingtool-cluster.yjalx.mongodb.net/?retryWrites=true&w=majority',
    smtp: {
        service: 'gmail',
        user: process.env.USER,
        pass: process.env.PASS,
        host: 'smtp.gmail.com',
        port: 465,
        secure: false
    },
    logLevel: 'info',
    accessTokenPrivateKey: '',
    accessTokenPublicKey: '',
    refreshTokenPrivateKey: '',
    refreshTokenPublicKey: '',
    accessTokenTTL: '30m',
    refreshTokenTTL: '1y',
    invalidLoginMessage: 'Invalid email or password',
    clientUrl: 'https://phare-counselor-finding-tool.herokuapp.com',
    uploadLocation: 'uploads/'
}