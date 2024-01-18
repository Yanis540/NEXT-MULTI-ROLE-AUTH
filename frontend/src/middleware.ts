import {withAuth} from "next-auth/middleware"
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import {headers} from 'next/headers'
import { User } from "@prisma/client";
const authRoutes = ["sign-in","sign-up"]
const adminRoutes = ["admin"]
export default withAuth(
    async function middleware(req) {
        const token = await getToken({req});
        // if token exists, !!token will be true
        const isAuthenticated = !!token;
        const pathName = req.nextUrl.pathname
        // if user is logged in then don't let him access sign/in or signup page 
        if (authRoutes.some((route)=>pathName.includes(route))) {
            if (isAuthenticated) {
                return NextResponse.redirect(new URL("/", req.url));
            }
        }
        const session:{user?:User,expires:string}|null = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/session`, {
            headers:headers(),
            // cache: "no-store"
          })
        .then( async( res ) => await res.json() );

        const {user} = session || {};
        
        const isAdmin= user?.role == "admin"; 

        // try and see what is his role 

        if(adminRoutes.some((route)=>pathName.includes(route))){
            if(!isAuthenticated || ! isAdmin)   
                return NextResponse.redirect(new URL("/dashboar",req.url))

        }

       
    }
)

export const config = {
    matcher: [
        '/admin','/dashboard'
    ], 
    
}