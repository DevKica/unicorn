import { betterFindUniqueUser } from "../../../services/user/auth.services";
import { EmailAlreadyExists } from "../../errors/main";

async function checkEmailAvailability(email: string): Promise<void> {
    const user = await betterFindUniqueUser({ email }, { email: true });
    if (user) throw new EmailAlreadyExists();
}

export default checkEmailAvailability;
