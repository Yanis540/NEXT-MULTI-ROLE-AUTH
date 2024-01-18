import { authServer } from "@/lib/auth-server";
import { publicProcedure, router } from "../server";
import { TRPCError } from "@trpc/server";
import { signUpSchema } from "@/lib/validators";
import { db } from "@/lib/db";
import bcrypt from 'bcrypt'




export const userRoute = router({
    current : publicProcedure.query(async({ctx,input})=>{
        try{
          const user = await authServer();  
          return {user} 
        }
        catch(e : any){
            throw new TRPCError({code:"UNAUTHORIZED", message : "Invalid credentials"})
        }
    }), 
    signUp : publicProcedure.input(signUpSchema).mutation(async({ctx,input})=>{
        const {email,name,password} = input; 
        const existingUser = await db.user.findFirst({
            where : {email}
        }); 
        if(existingUser)
            throw new TRPCError({code:'UNAUTHORIZED',message : 'Email already in use'}); 
        const salt = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(password,salt); 
        try{
            const user = await db.user.create({
                data:{
                    email : email , 
                    hashedPassword : hashedPassword,
                    name : name
                }
            }); 
            return {success: true}
        }
        catch(err){
            throw new TRPCError({code:'BAD_REQUEST',message : 'Something went wrong, please try later '}); 
        }
      


    })
})



