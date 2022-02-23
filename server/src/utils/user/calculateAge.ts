export function calculateAge(dob: Date): number {
    const diff_ms = Date.now() - dob.getTime();
    const age_dt = new Date(diff_ms);
    //
    return Math.abs(age_dt.getUTCFullYear() - 1970);
}
