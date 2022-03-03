function getExpirationDate(days: number): Date {
    const now = new Date();
    const expirationDateDay = now.getDate() + days;
    now.setDate(expirationDateDay);

    return now;
}

export default getExpirationDate;
