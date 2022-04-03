// @ts-nocheck

import Imap from "imap";
import { exit } from "process";
import { simpleParser } from "mailparser";
import { logError, logInfo } from "../../utils/logger";
import { TEST_EMAIL_ADDRESS, TEST_EMAIL_PASSWORD, SERVER_SUPPORT_EMAIL } from "../../config/env.config";

const testGmailInbox = async () => {
    try {
        const imap = new Imap({
            user: TEST_EMAIL_ADDRESS,
            password: TEST_EMAIL_PASSWORD,
            host: "imap.gmail.com",
            port: 993,
            tls: true,
            tlsOptions: { rejectUnauthorized: false },
            secure: true,
        });
        imap.once("ready", () => {
            imap.openBox("INBOX", false, () => {
                imap.search(["UNSEEN", ["FROM", SERVER_SUPPORT_EMAIL]], (err, results) => {
                    try {
                        const f = imap.fetch(results, { bodies: "" });
                        f.on("message", (msg) => {
                            msg.on("body", (stream) => {
                                simpleParser(stream, async (_err, parsed) => {
                                    const { from, subject, textAsHtml } = parsed;

                                    if (subject === "Email verification" && from?.value[0].address === SERVER_SUPPORT_EMAIL) {
                                        logInfo("Email verification successfully deleted");
                                    }
                                    // expect(subject).toEqual("Email verification");
                                    // expect(from?.value[0]?.address).toEqual(SERVER_SUPPORT_EMAIL);
                                    /*
                                    Make API call to save the data
                                    Save the retrieved data into a database.
                                    E.t.c
                                    */
                                });
                            });
                            msg.once("attributes", (attrs: any) => {
                                const { uid } = attrs;
                                imap.addFlags(uid, "Deleted");
                            });
                        });
                        f.once("error", (ex: any) => {
                            // return Promise.reject(ex);
                        });
                        f.once("end", () => {
                            imap.end();
                        });
                    } catch (e) {
                        logError(e);
                        exit(1);
                    }
                });
            });
        });

        imap.once("error", (e) => {
            logError(e);
        });

        imap.once("end", () => {
            //
        });

        imap.connect();
    } catch (ex) {
        logError(ex);
    }
};

export default testGmailInbox;

if (require.main === module) {
    (async () => {
        await testGmailInbox();
    })();
}
