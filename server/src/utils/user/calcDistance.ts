function toRad(value: number) {
    return (value * Math.PI) / 180;
}

function calcDistance(lat1i: number, lon1: number, lat2i: number, lon2: number) {
    try {
        if (lat1i === null || lon1 === null || lat2i === null || lon2 === null) throw Error;
        const R = 6371; // km
        const dLat = toRad(lat2i - lat1i);
        const dLon = toRad(lon2 - lon1);
        const lat1 = toRad(lat1i);
        const lat2 = toRad(lat2i);

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        return Math.round(d * 100) / 100;
    } catch (e) {
        return 0;
    }
}

export default calcDistance;
