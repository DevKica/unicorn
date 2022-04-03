import nodemailer from "nodemailer";
import { logError } from "../utils/logger";
import { MailOptions } from "nodemailer/lib/json-transport";
import { signEmailTokenJWT } from "./jwt.config";
import { emailTokenFormat } from "../@types/utils/jwt.config.types";
import { SERVER_SUPPORT_PASSWORD, ORIGIN, SERVER_SUPPORT_EMAIL } from "./env.config";

const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
        user: SERVER_SUPPORT_EMAIL,
        pass: SERVER_SUPPORT_PASSWORD,
    },
});

const verificationEmailContent = (token: string) => {
    return {
        from: SERVER_SUPPORT_EMAIL,
        subject: "Email verification",
        html: `Hello, click here to verify your email <a href="${ORIGIN}/special/emailVerification/${token}">
        <button>click here</button>
        </a>`,
    };
};
const passwordResetEmailContent = (token: string) => {
    return {
        from: SERVER_SUPPORT_EMAIL,
        subject: "Set your new password",
        html: `Hello, click here to set your new password<a href="${ORIGIN}/special/setNewPassword/${token}">
        <button>click here</button>
        </a>`,
    };
};

const sendEmailHandler = (clientEmail: string, emailContent: MailOptions) => {
    transporter.sendMail({ ...emailContent, to: clientEmail }, function (error) {
        if (error) {
            logError("Nodemailer error: " + error);
        }
    });
};

export const sendResetPasswordEmailHandler = (clientEmail: string, tokenData: emailTokenFormat) => {
    const token = signEmailTokenJWT(tokenData);
    sendEmailHandler(clientEmail, passwordResetEmailContent(token));
};

export const sendVerificationEmailHandler = (clientEmail: string, tokenData: emailTokenFormat) => {
    const token = signEmailTokenJWT(tokenData);
    sendEmailHandler(clientEmail, verificationEmailContent(token));
};
