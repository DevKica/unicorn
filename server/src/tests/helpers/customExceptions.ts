import { omit } from "lodash";

export function expectToEqualError(res: any, error: any) {
    expect(res.body.msg).toEqual(error.msg);
    expect(res.status).toEqual(error.code);
}

export function expectToEqual(res: any, status: number, data: Object) {
    expect(omit(res.body, "id", "photos")).toEqual(data);
    expect(res.status).toEqual(status);
}
