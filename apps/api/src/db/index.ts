// src/db/index.ts
import knex from "knex";
import knexConfig from "./knexfile"

// 개발 환경 설정을 사용
const db = knex(knexConfig.development);

export default db;