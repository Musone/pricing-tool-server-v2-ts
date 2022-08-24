module.exports = {
    port: process.env.PORT,
    // dbUri: 'mongodb://localhost:27017/pricing-tool-local',
    dbUri: 'mongodb+srv://Phare-Dev:XvJ9WmImAMQodvzM@pricing-tool.1nrux4k.mongodb.net/?retryWrites=true&w=majority',
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
    clientUrl: 'http://192.168.1.8:3000',
    uploadLocation: 'uploads/'
}
