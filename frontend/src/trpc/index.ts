import { publicProcedure, router } from './server';
 
export const appRouter = router({
    tryingSomething : publicProcedure.query(()=>{
        return "hi"; 
    })
});
 

export type AppRouter = typeof appRouter;