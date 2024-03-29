import nodemailer, {SendMailOptions} from 'nodemailer';
import config from "config";
import log from "./logger";

/*
async function createTestCreds() {
    const creds = await nodemailer.createTestAccount();
    console.log({ creds })
}

createTestCreds();
*/

const smtp = config.get<{
    user: string,
    pass: string,
    port: number,
    secure: boolean,
    host: string
}>('smtp');

// ~~ Transporter ~~
const transporter = nodemailer.createTransport({
    ...smtp,
    auth: {user: smtp.user, pass: smtp.pass},
});
log.info(`SMTP host:${smtp.host} user:${smtp.user}`);
// ~~~~

export default async function sendEmail(payload: SendMailOptions) {
    transporter.sendMail(payload, (err, info) => {
        if (err) {
            log.error(err, 'Error sending email');
            return;
        }

        log.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    })
}