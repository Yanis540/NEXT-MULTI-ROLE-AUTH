import { authServer } from "@/lib/auth-server";
import { publicProcedure, router } from "../server";
import { TRPCError } from "@trpc/server";
import {z} from "zod"




export const userRoute = router({
    current : publicProcedure.query(async({ctx,input})=>{
        try{
          const user = await authServer();  
          return {user} 
        }
        catch(e : any){
            throw new TRPCError({code:"UNAUTHORIZED", message : "Invalid credentials"})
        }
    })
})



