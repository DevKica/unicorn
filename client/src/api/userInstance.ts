import axios from "axios";
import { loginCredentials } from "./data";

axios.defaults.withCredentials = true;

export const mainAppInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

mainAppInstance.interceptors.response.use(
  res => {
    return res;
  },
  error => {
    return error.response;
  }
);

export const loginUser = async (id: number) =>
  mainAppInstance.post("/users/login", id ? loginCredentials[1] : loginCredentials[0]);

export const logOut = async () => mainAppInstance.delete("/sessions/");

export const getUserData = async () => mainAppInstance.get("/users/profile");
