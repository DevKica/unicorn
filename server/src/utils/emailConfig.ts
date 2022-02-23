import nodemailer from "nodemailer";
import { MailOptions } from "nodemailer/lib/json-transport";
import { type } from "os";
import { jwtEnumFormat } from "../@types/utils/jwtConfig.types";
import { SUPPORT_EMAIL_USER, SUPPORT_EMAIL_PASSWORD, EMAIL_SMTP_USER, ORIGIN, EMAIL_TOKEN_TTL, EMAIL_SECRET_TOKEN } from "../config/env";
import { signJWT } from "./jwtConfig";
import { logError, logInfo } from "./logger";

const transporter = nodemailer.createTransport({
    service: EMAIL_SMTP_USER,
    port: 465,
    secure: true,
    auth: {
        user: SUPPORT_EMAIL_USER,
        pass: SUPPORT_EMAIL_PASSWORD,
    },
});

const verificationEmailContent = (token: string) => {
    return {
        from: SUPPORT_EMAIL_USER,
        subject: "Email verification",
        html: `Hello, click here to verify your email <a href="${ORIGIN}/special/emailVerification/${token}"`,
    };
};
const resetPasswordEmailContent = (token: string) => {
    return {
        from: SUPPORT_EMAIL_USER,
        subject: "Set your new password",
        html: `Hello, click here to set your new password <a href="${ORIGIN}/special/setNewPassword/${token}"`,
    };
};

const sendEmailHandler = (clientEmail: string, emailContent: MailOptions) => {
    transporter.sendMail({ ...emailContent, to: clientEmail }, function (error, info) {
        if (error) {
            logError("Nodemailer error: " + error);
        } else {
            logInfo("Nodemailer success: " + info.response);
        }
    });
};

export const sendResetPasswordEmailHandler = (clientEmail: string) => {};

export const sendVerificationEmailHandler = (clientEmail: string, tokenData: jwtEnumFormat) => {
    const token = signJWT(tokenData, EMAIL_SECRET_TOKEN, EMAIL_TOKEN_TTL);
    sendEmailHandler(clientEmail, verificationEmailContent(token));
};
