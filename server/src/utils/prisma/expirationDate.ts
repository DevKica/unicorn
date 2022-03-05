function getExpirationDate(days: number): Date {
    const now = new Date();
    // using variables to avoid errors
    const expirationDateDay = now.getDate() + days;
    now.setDate(expirationDateDay);

    return now;
}

export default getExpirationDate;
