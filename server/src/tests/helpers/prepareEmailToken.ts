import { signEmailTokenJWT } from "../../config/jwt.config";
import { findEmailVerification } from "../../services/user/emailVerification.services";

const prepareEmailToken = async () => {
    const emailVerification = await findEmailVerification({ userId: global.testUserId });
    return signEmailTokenJWT({ objectId: emailVerification?.id || "" });
};

export default prepareEmailToken;
