import { UserType } from "./static.types";

interface userMatchPropertiesTemplate {
    id: UserType["id"];
    name: UserType["name"];
    surname: UserType["surname"];
    description: UserType["description"];
    gender: UserType["gender"];
    city: UserType["city"];
    sexualOrientation: string[];
}
export interface userMatchPropertiesJson extends userMatchPropertiesTemplate {
    birthday: string;
}
export interface userMatchProperties extends userMatchPropertiesTemplate {
    birthday: UserType["birthday"];
}

export interface UserFilterToMatch {
    id: UserType["id"];
    showMeGender?: UserType["showMeGender"];
    latitude: UserType["latitude"];
    longitude: UserType["longitude"];
    showMeAgeUpperLimit: UserType["showMeAgeUpperLimit"];
    showMeAgeLowerLimit: UserType["showMeAgeLowerLimit"];
}
