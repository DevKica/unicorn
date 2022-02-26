import { findUniqueUser } from "../../../services/user/auth.services";
import { EmailAlreadyExists } from "../../errors/main";

async function checkEmailAvailability(email: string): Promise<void> {
    const user = await findUniqueUser({ email }, { email: true });
    if (user) throw new EmailAlreadyExists();
}

export default checkEmailAvailability;
