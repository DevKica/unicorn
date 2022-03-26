import supertest from "supertest";
import server from "../server";

jest.setTimeout(10000);
global.request = supertest(server);
global.testAccessToken = "";
global.testRefreshToken = "";
global.testSecondAccessToken = "";
global.testUserId = "";
global.testConversationId = "";
global.testMessagesContent = ["Hi user1", "Hi user2", ""];
