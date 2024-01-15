import {PrismaClient} from "@prisma/client"

declare global {
    namespace globalThis {
        var prisma : PrismaClient
    }
    type Provider = "google" | "github"

}

declare module "next-auth" {
    interface Session {
      user?: {
        id: string;
      } & DefaultSession["user"];
    }
  }
