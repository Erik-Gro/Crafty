import { z } from "zod";
import { Hono } from "hono";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";

import { db } from "@/db/drizzle";
import { users } from "@/db/schema";

const app = new Hono().post(
  "/",
  zValidator(
    "json",
    z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(3).max(20),
    })
  ),
  async (c) => {
    const { name, email, password } = c.req.valid("json");

    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10);

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const query = await db.select().from(users).where(eq(users.email, email));

    if (query[0]) {
      return c.json({ error: "Hmm, what could it be?" }, 400);
    }

    await db.insert(users).values({
      email,
      name,
      password: hashedPassword,
    });

    return c.json(null, 200);
  }
);

export default app;
