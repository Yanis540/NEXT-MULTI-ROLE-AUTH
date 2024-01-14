import { userRoute } from './router/userRoute';
import { publicProcedure, router } from './server';
 
export const appRouter = router({
    tryingSomething : publicProcedure.query(()=>{
        return "hi"; 
    }), 
    user : userRoute
});
 

export type AppRouter = typeof appRouter;