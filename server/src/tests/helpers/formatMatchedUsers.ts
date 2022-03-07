import { matchedUser, matchedUserJson } from "../../@types/prisma/matchedUsers.types";
import { superlikeUsersIds } from "../../prisma/seed/data/likes";

interface matchUserRecord {
    [key: string]: matchedUserJson;
}

function formatMatchedUsers(data: matchedUser[]) {
    const result: matchUserRecord = {};

    let index = 0;

    data.forEach((e: matchedUser) => {
        const { id, name, surname, gender, city, description, birthday, sexualOrientation, superlike } = e;
        if (id in superlikeUsersIds) {
            result[String(index)]["superlike"] = true;
        }

        result[String(index)] = {
            id,
            name,
            surname,
            gender,
            city,
            description,
            birthday: JSON.stringify(birthday).slice(1, -1),
            sexualOrientation,
            superlike,
        };

        index += 1;
    });
    return result;
}

export default formatMatchedUsers;
