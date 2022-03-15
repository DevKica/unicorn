import cookie from "cookie";
import { Socket } from "socket.io";

import { NextFunction } from "express";
import { socketServerOptions } from "../../io";
import { removeGlobals } from "../helpers/globalHelpers";
import { verifyUserTokenJWT } from "../../config/jwt.config";
import { EVENTS } from "../../socketServer";
import { MessageType } from "../../@types/prisma/static.types";
import seedRelationsData from "../../prisma/seed/users.relations.seed";
import { loginCredentials, activeBasicUserData } from "../data/user.auth";
import { testPOSTRequest } from "../helpers/testEndpoint";
import { findSingleSession } from "../../services/session/session.services";

const { createServer } = require("http");
const { Server } = require("socket.io");
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

                // @ts-ignore
                socket.request.user = decoded;

                next();
            } catch (e) {
                next(new Error("Unauthorized"));
            }
        });

        httpServer.listen(async () => {
            port = httpServer.address().port;

            io.on("connection", async (socket: any) => {
                serverSocket = socket;
            });

            await seedRelationsData();

            await testPOSTRequest("/users/login", loginCredentials, activeBasicUserData, 200);

            done();
        });
    });

    afterAll(() => {
        io.close();
        removeGlobals();
    });

    describe("UNAUTHORIZED", () => {
        beforeAll((done) => {
            clientSocket = new Client(`http://localhost:${port}`);

            clientSocket.on("connect_error", (error: any) => {
                expect(error.message).toEqual("Unauthorized");
                done();
            });
        });

        test("test", () => {
            console.log("should not run or will it run");
            expect(true).toBeTruthy();
        });
        afterAll(() => {
            clientSocket.close();
        });
    });

    describe("AUTHORIZED", () => {
        beforeAll((done) => {
            clientSocket = new Client(`http://localhost:${port}`, { extraHeaders: { cookie: `accessToken=${testAccessToken}` } });

            clientSocket.on("connect", done);
        });
        afterAll(() => {
            clientSocket.close();
        });

        test("should work", (done) => {
            clientSocket.on(EVENTS.SERVER.NEW_MESSAGE_RECEIVED, (message: MessageType) => {
                console.log("in TEST", message);
                done();
            });

            serverSocket.emit(EVENTS.SERVER.NEW_MESSAGE_RECEIVED, "hallo");
        });

        // test("idk", (done) => {
        //     serverSocket.on(EVENTS.CLIENT.SEND_NEW_MESSAGE, (message: MessageType) => {
        //         console.log("TUU", message);
        //         done();
        //     });

        //     clientSocket.emit(EVENTS.SERVER.NEW_MESSAGE_RECEIVED, "message");
        // });
    });
});
