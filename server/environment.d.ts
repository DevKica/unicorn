declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // app
      PORT: number;
      ORIGIN: string;
      DATABASE_URL: string;
      // cookies
      MAIN_SECRET_TOKEN: string;
      ACCESS_TOKEN_TTL: string;
      REFRESH_TOKEN_TTL: string;
      MAX_AGE_TOKEN_COOKIE: string;
      // emails
      EMAIL_SECRET_TOKEN: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
