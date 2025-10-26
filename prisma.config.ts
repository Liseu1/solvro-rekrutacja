import "dotenv/config";
import { defineConfig, env } from "prisma/config";

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
