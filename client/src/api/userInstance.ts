import axios from "axios";
import { validCreateUserBody } from "./data";

axios.defaults.withCredentials = true;

export const userAuthInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

userAuthInstance.interceptors.response.use(
  res => {
    console.log(res.data);
    console.log(res.status);
    return res;
  },
  error => {
    console.log(error.response);
    return error;
  }
);

export const createUser = () => userAuthInstance.post(`/users`, validCreateUserBody);

export const testRoute = () => userAuthInstance.post("/");

export const uploadFile = (body: any) => userAuthInstance.post("/", body);
