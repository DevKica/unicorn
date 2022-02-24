import { UserModel } from "../../../prisma/models";
import { EmailAlreadyExists } from "../../errors/main";

async function checkEmailAvailability(email: string): Promise<void> {
    const user = await UserModel.findUnique({ where: { email } });
    if (user) throw new EmailAlreadyExists();
}

export default checkEmailAvailability;
