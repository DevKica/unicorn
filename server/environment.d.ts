declare global {
    namespace NodeJS {
        interface ProcessEnv {
            // app
            PORT: number;
            ORIGIN: string;
            DATABASE_URL: string;
            TEST_DATABASE_URL: string;

            // cookies
            MAIN_SECRET_TOKEN: string;
            ACCESS_TOKEN_TTL: string;
            REFRESH_TOKEN_TTL: string;
            MAX_AGE_TOKEN_COOKIE: number;

            // emails
            EMAIL_SECRET_TOKEN: string;
            EMAIL_TOKEN_TTL: string;
            SUPPORT_EMAIL_USER: string;
            SERVER_SUPPORT_PASSWORD: string;
            EMAIL_SMTP_HOST: string;

            TEST_EMAIL_ADDRESS: string;
            TEST_EMAIL_PASSWORD: string;
        }
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
