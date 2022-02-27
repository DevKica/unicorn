import nodemailer from "nodemailer";
import { MailOptions } from "nodemailer/lib/json-transport";
import { emailTokenFormat, jwtEnumFormat } from "../@types/utils/jwt.config.types";
import { SUPPORT_EMAIL_PASSWORD, ORIGIN, EMAIL_TOKEN_TTL, EMAIL_SECRET_TOKEN, SUPPORT_EMAIL_USERNAME } from "./env.config";
import { signEmailTokenJWT, signJWT } from "./jwt.config";
import { logError, logInfo } from "../utils/logger";

const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
        user: SUPPORT_EMAIL_USERNAME,
        pass: SUPPORT_EMAIL_PASSWORD,
    },
});

const verificationEmailContent = (token: string) => {
    return {
        from: SUPPORT_EMAIL_USERNAME,
        subject: "Email verification",
        html: `Hello, click here to verify your email <a href="${ORIGIN}/special/emailVerification/${token}">
        <button>click here</button>
        </a>`,
    };
};
const passwordResetEmailContent = (token: string) => {
    return {
        from: SUPPORT_EMAIL_USERNAME,
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
