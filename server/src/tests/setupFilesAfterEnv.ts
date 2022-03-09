import supertest from "supertest";
import server from "../server";

global.request = supertest(server);
global.testAccessToken = "";
global.testRefreshToken = "";
global.testUserId = "";
global.testConversationId = "";
global.testMessagesContent = [];
