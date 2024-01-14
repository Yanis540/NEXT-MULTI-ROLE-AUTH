import { authOptions } from "./auth";
import { db } from "./db";
import { getServerSession } from "next-auth";




const authServer = async()=>{
    const session = await getServerSession(authOptions);
    if(!session?.user?.email)
        throw new Error("Unauthorized");
    const user = await db.user.findFirst({
        where:{email:session.user.email}, 
    })
    if(!user)
        throw new Error("Unauthorized")

    return user ; 
}


export {
    authServer
}