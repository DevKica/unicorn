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

export interface userMatchSelectProperties extends userMatchPropertiesTemplate, userMatchProperties {
    showMeGender: UserType["showMeGender"];
    latitude: UserType["latitude"];
    longitude: UserType["longitude"];
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
