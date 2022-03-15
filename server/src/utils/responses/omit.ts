const pureOmit = (obj: any, arr: string[]) =>
    Object.keys(obj)
        .filter((k) => !arr.includes(k))
        .reduce((acc: any, key: string) => ((acc[key] = obj[key]), acc), {});

export default pureOmit;
