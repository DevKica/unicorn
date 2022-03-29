import dayjs from "dayjs";

// Only 18+ users can create an account
const ageAllowed = 18;

export const dateRestriction = dayjs().subtract(ageAllowed, "y").toDate();

export const userLikesLimit = 10;

export const superLikesLimit = 5;
