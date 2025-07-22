// knexfile.ts
import type { Knex } from "knex";
import * as dotenv from "dotenv";
dotenv.config();


const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: parseInt(process.env.DB_PORT || "5432"),
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./src/db/migrations", // 마이그레이션 파일 경로
    },
    seeds: {
      directory: "./src/db/seeds", // 시드 파일 경로 (선택 사항)
    },
  },
  // production 환경 설정도 필요하다면 추가하세요.
};

export default config;