/**
 * Global environment variable types.
 * Add your project's env keys below and adjust types as needed.
 */

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: "development" | "production" | "test";
      readonly PORT?: string;
      readonly DATABASE_URL?: string;
      readonly DATABASE_URL_READONLY?: string;
      readonly SECRET_KEY?: string;
      readonly NEXT_PUBLIC_APP_URL: string;
      readonly APPWRITE_ENDPOINT: string;
      readonly APPWRITE_PROJECT_ID: string;
      // Appwrite API key must never be exposed to client-side code.
      // The admin API key is stored and used only on the server.
    }
  }
}

export {};
