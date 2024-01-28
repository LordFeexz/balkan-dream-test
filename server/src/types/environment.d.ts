declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CORS_LIST: string;
      TOKEN_SECRET: string;
      PORT: string;
      DATABASE_URL: string;
    }
  }
}

export {};
