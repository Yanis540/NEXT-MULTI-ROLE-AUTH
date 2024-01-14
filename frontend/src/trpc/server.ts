import { TRPCError, initTRPC } from '@trpc/server';
import { createContext } from './context';

 

const t = initTRPC.context<typeof createContext>().create();
export const router = t.router;
export const publicProcedure = t.procedure


const middleware = t.middleware
// define middlewares 
export const authMiddleware = middleware(async({ctx,next})=>{
    if (!ctx.user) {
        throw new TRPCError({ code: 'UNAUTHORIZED',message:"Invalid credentials" });
    }
    return next({
        ctx: {
            user: ctx.user,
        },
    });
})
export const adminMiddleware = middleware(async({ctx,next})=>{
    if (!ctx.user) {
        throw new TRPCError({ code: 'UNAUTHORIZED',message:"Invalid credentials" });
    }
    if(ctx.user.role!="admin")
        throw new TRPCError({code:"UNAUTHORIZED",message:"not an admin"})
    return next({
        ctx: {
            user: ctx.user,
        },
    });
})



// procedures 
export const authProcedure = publicProcedure.use(authMiddleware)
export const adminProcedure = publicProcedure.use(adminMiddleware)