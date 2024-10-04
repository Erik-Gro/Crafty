import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { db } from "./db/drizzle";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [GitHub],
});

// import NextAuth from "next-auth";

// import authConfig from "@/auth.config";

// export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
