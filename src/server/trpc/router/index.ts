// src/server/trpc/router/index.ts
import { t } from "../trpc";
import { adminSettingRouter } from "./admin-setting-router";
import { authRouter } from "./auth";
import { exampleRouter } from "./guest";

export const appRouter = t.router({
  admin:adminSettingRouter,
  auth: authRouter,
  example:exampleRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
