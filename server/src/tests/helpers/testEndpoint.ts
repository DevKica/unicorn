import { apiVersion } from "../data/config";
import { expectToEqual, expectToEqualError } from "./customExceptions";

export async function testPOSTRequest(endpoint: string, data: any, equalObject: any = false, equalStatus: any = 0) {
    const res = await global.request.post(`/api/${apiVersion}${endpoint}`).send(data);
    if (equalStatus) {
        if (equalObject) {
            expectToEqual(res, equalStatus, equalObject);
        }
    } else {
        expectToEqualError(res, equalObject);
    }
}
