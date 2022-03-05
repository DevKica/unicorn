import { userMatchPropertiesJson, userMatchProperties } from "../../@types/prisma/matchedUsers.types";

interface matchUserRecodrd {
    [key: string]: userMatchPropertiesJson;
}

function formatMatchedUsers(data: userMatchProperties[]) {
    const result: matchUserRecodrd = {};

    let index = 0;

    data.forEach((e: userMatchProperties) => {
        const { id, name, surname, gender, city, description, birthday, sexualOrientation } = e;

        result[String(index)] = {
            id,
            name,
            surname,
            gender,
            city,
            description,
            birthday: JSON.stringify(birthday).slice(1, -1),
            sexualOrientation,
        };
        index += 1;
    });

    return result;
}

export default formatMatchedUsers;
