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
import mainSeed from "../../prisma/seed/main.seed";
import { expectToEqualObject } from "../helpers/customExpectations";
import { createTextMessageData } from "../data/user.relations";
import { findAllUserConversations } from "../../services/conversations.services";
import { getAuthToken } from "../helpers/specifiedEndpointsTests";

const { createServer } = require("http");
const Client = require("socket.io-client");

describe("SOCKETS", () => {
    let port: number, serverSocketOne: Socket, serverSocketTwo: Socket, clientSocketOne: any, clientSocketTwo: any, io: any;

    const { body, response } = createTextMessageData;

    const { data, omit } = response;

    beforeAll((done) => {
        global.testConversationId = "conversation1";

        body.valid.conversationId = global.testConversationId;

        response.data.conversationId = global.testConversationId;

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
                const { userId } = socket.request.user;

                const userConversations = await findAllUserConversations(userId);

                userConversations.forEach((e) => {
                    socket.join(e.id);
                });

                if (userId === "1") {
                    serverSocketOne = socket;
                } else {
                    serverSocketTwo = socket;
                }
            });

            await mainSeed();

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
            clientSocketOne = new Client(`http://localhost:${port}`);

            clientSocketOne.on("connect_error", (error: any) => {
                errorMessage = error.message;
                done();
            });
        });

        afterAll(() => {
            clientSocketOne.close();
        });

        test("Error message should be equal to unauthorized", () => {
            expect(errorMessage).toEqual("Unauthorized");
        });
    });

    describe("AUTHORIZED", () => {
        beforeEach((done) => {
            clientSocketOne = new Client(`http://localhost:${port}`, { extraHeaders: { cookie: `accessToken=${testAccessToken}` } });
            clientSocketTwo = new Client(`http://localhost:${port}`, { extraHeaders: { cookie: `accessToken=${testSecondAccessToken}` } });

            clientSocketOne.on("connect", done);
            clientSocketTwo.on("connect", done);
        });

        afterEach(() => {
            clientSocketOne.close();
            clientSocketTwo.close();
        });

        test("The server should receive a notification of a new message from the client", (done) => {
            if (serverSocketOne) {
                serverSocketOne.on(EVENTS.CLIENT.SEND_NEW_MESSAGE, (message: MessageType) => {
                    expectToEqualObject(message, data, omit);
                    done();
                });
            } else {
                done();
            }
            (async () => {
                const res = await testPOSTRequest("/messages/text", body.valid, response);
                clientSocketOne.emit(EVENTS.CLIENT.SEND_NEW_MESSAGE, res.body);
            })();
        });

        test("The clients should receive new message from the server emitted to everyone", (done) => {
            clientSocketOne.on(EVENTS.SERVER.NEW_MESSAGE_RECEIVED, () => {
                done();
            });

            io.emit(EVENTS.SERVER.NEW_MESSAGE_RECEIVED);
        });

        test("Client ONE whose serverSocket sent the new message should NOT receive it, others should NOT", (done) => {
            clientSocketTwo.on(EVENTS.SERVER.NEW_MESSAGE_RECEIVED, () => {
                expect(false).toEqual(true);
                done();
            });

            clientSocketOne.on(EVENTS.SERVER.NEW_MESSAGE_RECEIVED, () => {
                done();
            });

            serverSocketOne.emit(EVENTS.SERVER.NEW_MESSAGE_RECEIVED);
        });

        test("Client TWO whose serverSocket sent the new message should receive it, others should NOT", (done) => {
            clientSocketOne.on(EVENTS.SERVER.NEW_MESSAGE_RECEIVED, () => {
                expect(false).toEqual(true);
                done();
            });
            clientSocketTwo.on(EVENTS.SERVER.NEW_MESSAGE_RECEIVED, () => {
                done();
            });

            serverSocketTwo.emit(EVENTS.SERVER.NEW_MESSAGE_RECEIVED);
        });

        test("Client ONE should receive a new message from a server to the private room of which he is a member", (done) => {
            clientSocketOne.on(EVENTS.SERVER.NEW_MESSAGE_RECEIVED, () => {
                done();
            });

            io.to(global.testConversationId).emit(EVENTS.SERVER.NEW_MESSAGE_RECEIVED);
        });

        test("Client ONE should NOT receive a new message from the server to a private room of which he is not a member, client TWO should receive it (because he is a member of it)", (done) => {
            clientSocketOne.on(EVENTS.SERVER.NEW_MESSAGE_RECEIVED, () => {
                // throw error if client ONE receives message
                expect(false).toEqual(true);
                done();
            });

            clientSocketTwo.on(EVENTS.SERVER.NEW_MESSAGE_RECEIVED, () => {
                done();
            });

            io.to("conversation3").emit(EVENTS.SERVER.NEW_MESSAGE_RECEIVED);
        });
    });
});
