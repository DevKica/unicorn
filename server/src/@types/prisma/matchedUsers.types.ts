import { LikeObjectType, UserType } from "./static.types";

interface matchedUserTemplate {
    id: UserType["id"];
    name: UserType["name"];
    surname: UserType["surname"];
    description: UserType["description"];
    gender: UserType["gender"];
    city: UserType["city"];
    sexualOrientation: string[];
}

export interface matchedUserToPrepareTemplate extends matchedUserTemplate {
    showMeGender: UserType["showMeGender"];
    latitude: UserType["latitude"];
    longitude: UserType["longitude"];
    user?: { typeOfLike: LikeObjectType["typeOfLike"] }[];
}

export interface matchedUser extends matchedUserTemplate {
    birthday: UserType["birthday"];
    superlike?: boolean;
}

export interface matchedUserJson extends matchedUserTemplate {
    birthday: string;
    superlike?: boolean;
}
export interface matchedUserToPrepare extends matchedUserToPrepareTemplate {
    birthday: UserType["birthday"];
    superlike?: boolean;
}

export interface UserFilterToMatch {
    id: UserType["id"];
    gender: UserType["gender"];
    showMeGender?: UserType["showMeGender"];
    latitude: UserType["latitude"];
    longitude: UserType["longitude"];
    showMeDistance: UserType["showMeDistance"];
    showMeAgeUpperLimit: UserType["showMeAgeUpperLimit"];
    showMeAgeLowerLimit: UserType["showMeAgeLowerLimit"];
}
