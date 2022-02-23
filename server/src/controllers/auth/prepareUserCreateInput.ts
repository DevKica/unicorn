import { UserCreateInput } from "../../@types/prisma/static.types";
import { CreateUserBody } from "../../@types/routes/requests.types.";
import { calculateAge } from "../../utils/user/calculateAge";
import { omit } from "lodash";

export function prepareCreateUserInput(body: CreateUserBody): UserCreateInput {
    const age = calculateAge(new Date(body.birthday));
    const showMeAgeLowerLimit = age - 4 < 18 ? 18 : age - 4;
    const showMeAgeUpperLimit = age + 4;
    return {
        ...omit(body, "passwordRepetition"),
        birthday: new Date(body.birthday),
        showMeAgeLowerLimit,
        showMeAgeUpperLimit,
    };
}
