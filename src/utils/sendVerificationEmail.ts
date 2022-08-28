import {User} from "../model/user.model";
import sendEmail from "./mailer";
import {DocumentType} from "@typegoose/typegoose";

export default async function sendVerificationEmail(clientUrl: string, user: DocumentType<User>) {
    const verificationLink = `${clientUrl}/auth/verify?id=${user._id}&code=${user.verificationCode}`;
    await sendEmail({
        from: 'admin@server.com',
        to: user.email,
        subject: 'Phare: Please verify your account',
        html: `<h3>Verify you email with the url below</h3><a href="${verificationLink}">${verificationLink}</a>`,
    });
}