import { signEmailTokenJWT } from "../../config/jwt.config";
import { findEmailVerification } from "../../services/user/emailVerification.services";
import { findPasswordReset } from "../../services/user/passwordReset.services";

export const prepareEmailVericationToken = async (): Promise<string> => {
    const emailVerification = await findEmailVerification({ userId: global.testUserId });
    return signEmailTokenJWT({ objectId: emailVerification?.id || "" });
};

export const preparePasswordResetToken = async (): Promise<string> => {
    const passwordReset = await findPasswordReset({ userId: global.testUserId });
    return signEmailTokenJWT({ objectId: passwordReset?.id || "" });
};
