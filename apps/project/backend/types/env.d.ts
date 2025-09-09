declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    TMDB_URL: string;
    JWT_SECRET: string;
    TMDB_TOKEN: string;
    MONGODB_URI: string;
  }
}
