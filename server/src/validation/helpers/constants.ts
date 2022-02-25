// Only 18+ users can create an account
const current = new Date();
const ageAllowed = 18;
const dateFullYearRestriction = current.getFullYear() - ageAllowed;
current.setFullYear(dateFullYearRestriction);

export const dateRestriction = current;

const current1 = new Date();
const secondsAllowed = 10;
const emailFilterConfig = current1.getFullYear() - secondsAllowed;
current1.setFullYear(emailFilterConfig);

export const emailFilterRestriction = current1;
