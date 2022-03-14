import cookie from "cookie";
import { Socket } from "socket.io";
import { NextFunction } from "express";
// import { verifyUserTokenJWT } from "../../config/jwt.config";
import { socketServerOptions } from "../../io";
import { removeGlobals } from "../helpers/globalHelpers";
import { verifyUserTokenJWT } from "../../config/jwt.config";
import console from "console";
// import { EVENTS } from "../../socketServer";

const { createServer } = require("http");
const { Server } = require("socket.io");
const Client = require("socket.io-client");

describe("SOCKETS", () => {
    let io: any, port: any, serverSocket: any, clientSocket: any;

    beforeAll((done) => {
        // seed data
        // seedRelationsData();

        // get tokesn
        // testPOSTRequest("/users/login", loginCredentials, activeBasicUserData, 200);

        // create server
        const httpServer = createServer();

        // init io instance
        io = new Server(httpServer, socketServerOptions);

        // apply middleware
        io.use((socket: Socket, next: NextFunction) => {
            try {
                console.log("handshake", socket.handshake.headers);

                const cookies = cookie.parse(socket.handshake.headers.cookie || "");
                const { decoded } = verifyUserTokenJWT(cookies.accessToken);

                console.log("decoded", decoded);
                if (!decoded) throw Error();

                // const session = await findSingleSession({ id: decoded.sessionId });
                // if (!session || !session.valid) throw Error();

                // // @ts-ignore
                // socket.request.user = decoded;

                next();
            } catch (e) {
                next(new Error("forbidden"));
            }
        });

        httpServer.listen(() => {
            port = httpServer.address().port;

            io.on("connection", (socket: any) => {
                console.log("handshake", socket.handshake);

                serverSocket = socket;
            });

            // clientSocket.on("connect_error", (err: any) => {
            //     console.log("essa");
            //     console.log(err.message); // prints the message associated with the error
            //     clientSocket.close();
            // });

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

            console.log(clientSocket);

            clientSocket.on("connect_error", (error: any) => {
                console.log(error);
                done();
            });

            clientSocket.on("connect", done);
        });

        test("test", () => {
            expect(true).toBeTruthy();
            serverSocket;
        });
        afterAll(() => {
            clientSocket.close();
        });
    });

    // describe("AUTHORIZED", () => {
    //     beforeAll((done) => {
    //         clientSocket = new Client(`http://localhost:${port}`, { extraHeaders: { Authorization: "123" } });
    //         clientSocket.on("connect", done);
    //     });
    //     afterAll(() => {
    //         clientSocket.close();
    //     });

    //     test("should work", (done) => {
    //         clientSocket.on(EVENTS.SERVER.NEW_MESSAGE_RECEIVED, (message: any) => {
    //             console.log("in TEST", message);

    //             clientSocket.emit(EVENTS.CLIENT.SEND_NEW_MESSAGE, "123");
    //             done();
    //         });

    //         serverSocket.emit(EVENTS.SERVER.NEW_MESSAGE_RECEIVED, "eluwina");
    //     });

    //     test("idk", (done) => {
    //         serverSocket.on(EVENTS.CLIENT.SEND_NEW_MESSAGE, (message: any) => {
    //             console.log("TUU", message);
    //             done();
    //         });

    //         clientSocket.emit(EVENTS.SERVER.NEW_MESSAGE_RECEIVED, "message");
    //     });
    // });
});
