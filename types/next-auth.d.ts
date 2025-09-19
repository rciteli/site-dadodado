// types/next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // <- adiciona id no Session.user
    } & DefaultSession["user"];
  }

  interface User {
    id: string; // <- se você usa user.id no callback/jwt etc.
  }
}

export {};
