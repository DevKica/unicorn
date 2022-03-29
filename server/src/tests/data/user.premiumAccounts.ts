import { basicActiveUserData, userOmitProperties } from "./user.auth";

const silverUserData = { ...basicActiveUserData, accountType: "silver" };
const goldUserData = { ...basicActiveUserData, accountType: "gold" };
const blackUserData = { ...basicActiveUserData, accountType: "black" };

export const premiumLikeData = {
    default: { judgedUserId: "user10", typeOfLike: "default" },
    superLikesToLimit: ["user20", "user21", "user22", "user23", "user24", "user25"],
    superLikesExceeded: { judgedUserId: "user26", typeOfLike: "super" },
};

export const silverTokenData = {
    validId: "token1",
    validToken: "silverToken",
    invalidId: "token2",
    invalidToken: "goldToken",
    validExpired: "token0/tokenZero",
};
export const goldTokenData = {
    validId: "token2",
    validToken: "goldToken",
};
export const blackTokenData = {
    validId: "token3",
    validToken: "blackToken",
};

export const silverUserDataResponse = {
    data: silverUserData,
    status: 200,
    omit: userOmitProperties,
};

export const goldUserDataResponse = {
    data: goldUserData,
    status: 200,
    omit: userOmitProperties,
};

export const blackUserDataResponse = {
    data: blackUserData,
    status: 200,
    omit: userOmitProperties,
};
