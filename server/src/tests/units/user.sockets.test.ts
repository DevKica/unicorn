import cookie from "cookie";
import { Socket, Server } from "socket.io";
import { NextFunction } from "express";
import { socketServerOptions } from "../../io";
import { removeGlobals } from "../helpers/globalHelpers";
import { verifyUserTokenJWT } from "../../config/jwt.config";
import { EVENTS } from "../../socketServer";
import { MessageType } from "../../@types/prisma/static.types";
import { basicActiveUserDataResponse, loginCredentials, secondUserLoginCredentials } from "../data/user.auth";
import { testPOSTRequest } from "../helpers/testEndpoint";
import { findSingleSession } from "../../services/session/session.services";
import seedRelationsData from "../../prisma/seed/users.relations.seed";
import { expectToEqualObject } from "../helpers/customExpectations";
import { createTextMessageData } from "../data/user.relations";
import { findAllUserConversations } from "../../services/conversations.services";
import { getAuthToken } from "../helpers/specifiedEndpointsTests";

const { createServer } = require("http");
const Client = require("socket.io-client");

describe("SOCKETS", () => {
    let port: number, userServerSocket: Socket, secondServerSocket: Socket, userClientSocket: any, secondClientSocket: any, io: any;

    beforeAll((done) => {
        // create server
        const httpServer = createServer();

        // init io instance
        io = new Server(httpServer, socketServerOptions);

        // apply middleware
        io.use(async (socket: Socket, next: NextFunction) => {
            try {
                const cookies = cookie.parse(socket.handshake.headers.cookie || "");

                const { decoded } = verifyUserTokenJWT(cookies.accessToken);

                if (!decoded) throw Error;

                const session = await findSingleSession({ id: decoded.sessionId });
                if (!session || !session.valid) throw Error;

                //@ts-ignore
                socket.request.user = decoded;

                next();
            } catch (e) {
                next(new Error("Unauthorized"));
            }
        });

        httpServer.listen(async () => {
            port = httpServer.address().port;

            io.on("connection", async (socket: Socket) => {
                //@ts-ignore
                const { user } = socket.request;

                if (user.userId === "1") {
                    userServerSocket = socket;
                } else {
                    secondServerSocket = socket;
                }

                const userConversations = await findAllUserConversations(user.userId);

                userConversations.forEach((e) => {
                    socket.join(e.id);
                });
            });

            await seedRelationsData();

            await testPOSTRequest("/users/login", loginCredentials, basicActiveUserDataResponse);

            global.testSecondAccessToken = await getAuthToken(secondUserLoginCredentials);

            done();
        });
    });

    afterAll(() => {
        io.close();
        removeGlobals();
    });

    describe("UNAUTHORIZED", () => {
        let errorMessage: string;
        beforeAll((done) => {
            userClientSocket = new Client(`http://localhost:${port}`);

            userClientSocket.on("connect_error", (error: any) => {
                errorMessage = error.message;
                done();
            });
        });
        test("Error message should be equal to unauthorized", () => {
            expect(errorMessage).toEqual("Unauthorized");
        });
        afterAll(() => {
            userClientSocket.close();
        });
    });

    describe("AUTHORIZED", () => {
        const { body, response } = createTextMessageData;

        beforeAll((done) => {
            global.testConversationId = "conversation1";

            body.valid.conversationId = global.testConversationId;

            response.data.conversationId = global.testConversationId;

            secondClientSocket = new Client(`http://localhost:${port}`, { extraHeaders: { cookie: `accessToken=${testSecondAccessToken}` } });

            userClientSocket = new Client(`http://localhost:${port}`, { extraHeaders: { cookie: `accessToken=${testAccessToken}` } });

            secondClientSocket.on("connect", done);

            userClientSocket.on("connect", done);
        });
        afterAll(() => {
            secondClientSocket.close();
            userClientSocket.close();
        });

        test("The server should receive a notification of a new message from the client", (done) => {
            userServerSocket.on(EVENTS.CLIENT.SEND_NEW_MESSAGE, (message: MessageType) => {
                const { data, omit } = response;
                expectToEqualObject(message, data, omit);
                done();
            });
            (async () => {
                const res = await testPOSTRequest("/messages/text", body.valid, response);
                userClientSocket.emit(EVENTS.CLIENT.SEND_NEW_MESSAGE, res.body);
            })();
        });

        secondServerSocket;

        test("The clients should receive new message from the server emitted to everyone", (done) => {
            userClientSocket.on(EVENTS.SERVER.NEW_MESSAGE_RECEIVED, (message: MessageType) => {
                const { data, omit } = response;
                expectToEqualObject(message, data, omit);
                done();
            });

            secondClientSocket.on(EVENTS.SERVER.NEW_MESSAGE_RECEIVED, (message: MessageType) => {
                const { data, omit } = response;
                expectToEqualObject(message, data, omit);
                done();
            });

            (async () => {
                const res = await testPOSTRequest("/messages/text", body.valid, response);
                io.emit(EVENTS.SERVER.NEW_MESSAGE_RECEIVED, res.body);
            })();
        });

        test("The client should receive a new message from a server to the private room of which he is a member", (done) => {
            userClientSocket.on(EVENTS.SERVER.NEW_MESSAGE_RECEIVED, (message: MessageType) => {
                const { data, omit } = response;
                expectToEqualObject(message, data, omit);
                done();
            });

            (async () => {
                const res = await testPOSTRequest("/messages/text", body.valid, response);
                io.to(global.testConversationId).emit(EVENTS.SERVER.NEW_MESSAGE_RECEIVED, res.body);
            })();
        });

        test("The client should NOT receive a new message from a server to the private room of which he is not a member", (done) => {
            userClientSocket.on(EVENTS.SERVER.NEW_MESSAGE_RECEIVED, () => {
                // throw error if client receive message from another room
                expect(false).toEqual(true);
                done();
            });

            secondClientSocket.on(EVENTS.SERVER.NEW_MESSAGE_RECEIVED, (message: MessageType) => {
                const { data, omit } = response;
                expectToEqualObject({ ...message, userId: "7" }, { ...data, userId: "7" }, omit);
                done();
            });

            (async () => {
                const res = await testPOSTRequest("/messages/text", body.valid, response);
                io.to("conversation2").emit(EVENTS.SERVER.NEW_MESSAGE_RECEIVED, res.body);
            })();
        });
    });
});
