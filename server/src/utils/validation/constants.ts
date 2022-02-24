// Only 18+ users can create an account
const current = new Date();
const ageAllowed = 18;
const dateFullYearRestriction = current.getFullYear() - ageAllowed;
current.setFullYear(dateFullYearRestriction);

export const dateRestriction = current;
