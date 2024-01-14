import { User } from '@prisma/client'
import { create } from 'zustand'

interface UserState {
    user ?: User  
    set_user: (user:User|undefined) => void
    
}

const useStoreUser = create<UserState>((set:any)=>({
    user :undefined, 
    refetch_user: ()=>{},
    set_user : (user:User|undefined)=>set((prev:UserState)=>{
        return {...prev,user}
    }),
}))

export {
    useStoreUser
}