import { UserModel } from "../../prisma/models";
import { EmailAlreadyExists } from "../../utils/errors/main";

export async function checkEmailAvailability(email: string): Promise<void> {
    const user = await UserModel.findUnique({ where: { email } });
    if (user) throw new EmailAlreadyExists();
}
