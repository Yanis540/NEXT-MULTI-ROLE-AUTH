import { authServer } from "@/lib/auth-server";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";

export const createContext = async (opts: CreateNextContextOptions) => {
    try{

        const user = await authServer();
    
        return {
            ...opts,
            user : user 
        };
    }
    catch(e){
        return {
            user : null 
        }
    }
}