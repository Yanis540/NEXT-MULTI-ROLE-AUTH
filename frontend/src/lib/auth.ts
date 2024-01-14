import { PrismaClient } from "@prisma/client"
import { AuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db"
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt"
const prisma = new PrismaClient()

export const authOptions : AuthOptions = {
    // Configure one or more authentication providers
    secret : process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_ID!,
        clientSecret: process.env.GITHUB_SECRET!,
      }),
      // ...add more providers here
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
      CredentialsProvider({
        name: "credentials",
        credentials: {
            email: {label: "Email",type: "text",},
            password: { label: "Password", type: "password" },
        },
        async authorize(credentials){
            if(!credentials?.email || !credentials?.password)
                throw new Error("Unauthorized");
            const user = await db.user.findFirst({
                where:{
                    email: credentials?.email
                }
            })
            if(!user)
                throw new Error(`No user with Email : ${credentials?.email}`)
            const isCorrectPassword = await bcrypt.compare(credentials.password,user?.hashedPassword!);
            if(!isCorrectPassword)
                throw new Error("Unauthorized");

            return user ; 
        }
    })
    ],
    adapter: PrismaAdapter(prisma),
}  