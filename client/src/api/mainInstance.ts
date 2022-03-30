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

export const loginUser = async (id: number) => await mainAppInstance.post("/users/login", loginCredentials[id]);

export const logOut = async () => await mainAppInstance.delete("/sessions/");

export const getUserData = async () => await mainAppInstance.get("/users/profile");

export const getUserConversations = async () => await mainAppInstance.get("/conversations");

export const sendMessage = async (data: { content: string; conversationId: string }) =>
  await mainAppInstance.post("/messages/text", data);

export const getUsersToMatchHandler = async () => await mainAppInstance.get("/users");

export const rewindLastLike = async (id: string) => await mainAppInstance.delete(`/likes/${id}`);
