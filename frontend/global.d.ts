import {PrismaClient} from "@prisma/client"

declare global {
    namespace globalThis {
        var prisma : PrismaClient
    }
}

declare module "next-auth" {
    interface Session {
      user?: {
        id: string;
      } & DefaultSession["user"];
    }
  }