declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CORS_LIST: string;
      TOKEN_SECRET: string;
      PORT: string;
      DATABASE_URL: string;
      GOOGLE_OAUTH_CLIENT_SECRET: string;
      GOOGLE_OAUTH_CLIENT_ID: string;
      ALPHA_VANTAGE_APIKEY: string;
    }
  }
}

export {};
