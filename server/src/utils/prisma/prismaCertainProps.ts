export const prismaCertainProps = <Model>(props: (keyof Model)[]): Record<keyof Model, true> => {
    const result = {} as Record<keyof Model, true>;
    props.forEach((prop) => (result[prop] = true));
    return result;
};
