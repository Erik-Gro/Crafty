import { Context, Hono } from "hono";
import { handle } from "hono/vercel";

import images from "./images";
import ai from "./ai";
import users from "./users";

// Revert to "nodejs" if planning on running on the nodejs
export const runtime = "edge";

const app = new Hono().basePath("/api");

const routes = app
  .route("/ai", ai)
  .route("/users", users)
  .route("/images", images);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
