import supertest from "supertest";
import server from "../server";

global.request = supertest(server);
global.accessToken = "";
global.refreshToken = "";
