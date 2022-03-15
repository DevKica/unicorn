import cookie from "cookie";
import { Socket, Server } from "socket.io";
import { NextFunction } from "express";
import { socketServerOptions } from "../../io";
import { removeGlobals } from "../helpers/globalHelpers";
import { verifyUserTokenJWT } from "../../config/jwt.config";
import { EVENTS } from "../../socketServer";
import { MessageType } from "../../@types/prisma/static.types";
import { basicActiveUserDataResponse, loginCredentials } from "../data/user.auth";
import { testPOSTRequest } from "../helpers/testEndpoint";
import { findSingleSession } from "../../services/session/session.services";
import seedRelationsData from "../../prisma/seed/users.relations.seed";
import { expectToEqualObject } from "../helpers/customExpectations";
import { createTextMessageData } from "../data/user.relations";
import { findAllUserConversations } from "../../services/conversations.services";

const { createServer } = require("http");
const Client = require("socket.io-client");

describe("SOCKETS", () => {
    let port: number, serverSocket: Socket, clientSocket: any, io: any;

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
                serverSocket = socket;

                //@ts-ignore
                const { user } = socket.request;

                const userConversations = await findAllUserConversations(user.userId);

                userConversations.forEach((e) => {
                    socket.join(e.id);
                });
            });

            await seedRelationsData();

            await testPOSTRequest("/users/login", loginCredentials, basicActiveUserDataResponse);

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
            clientSocket = new Client(`http://localhost:${port}`);

            clientSocket.on("connect_error", (error: any) => {
                errorMessage = error.message;
                done();
            });
        });
        test("Error message should be equal to unauthorized", () => {
            expect(errorMessage).toEqual("Unauthorized");
        });
        afterAll(() => {
            clientSocket.close();
        });
    });

    describe("AUTHORIZED", () => {
        const { body, response } = createTextMessageData;

        beforeAll((done) => {
            global.testConversationId = "conversation1";

            body.valid.conversationId = global.testConversationId;

            response.data.conversationId = global.testConversationId;

            clientSocket = new Client(`http://localhost:${port}`, { extraHeaders: { cookie: `accessToken=${testAccessToken}` } });

            clientSocket.on("connect", done);
        });
        afterAll(() => {
            clientSocket.close();
        });

        test("The server should receive a notification of a new message from the client", (done) => {
            serverSocket.on(EVENTS.CLIENT.SEND_NEW_MESSAGE, (message: MessageType) => {
                const { data, omit } = response;

                expectToEqualObject(message, data, omit);
                done();
            });
            (async () => {
                const res = await testPOSTRequest("/messages/text", body.valid, response);
                clientSocket.emit(EVENTS.CLIENT.SEND_NEW_MESSAGE, res.body);
            })();
        });

        test("The client should receive new message from the server", (done) => {
            clientSocket.on(EVENTS.SERVER.NEW_MESSAGE_RECEIVED, (message: MessageType) => {
                const { data, omit } = response;

                expectToEqualObject(message, data, omit);

                done();
            });

            (async () => {
                const res = await testPOSTRequest("/messages/text", body.valid, response);
                serverSocket.emit(EVENTS.SERVER.NEW_MESSAGE_RECEIVED, res.body);
            })();
        });
    });
});
