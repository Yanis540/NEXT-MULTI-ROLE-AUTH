import { toast } from "sonner";
import { useSession,signIn } from "next-auth/react"
import {SubmitHandler, useForm} from 'react-hook-form'
import { SignInSchema } from '@/lib/validators';
import { useEffect } from "react";
import { useRouter } from "next/navigation";



export const useAuth = ()=>{
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<SignInSchema>(); 
    const router = useRouter(); 
    const session = useSession(); 
    
    const handleProviderSignIn = async(provider ? : Provider)=>{
        try{
            await signIn(provider,{redirect:false}); 
            toast.success("Logged in ! ")

        }
        catch(err){
            toast.error("Something went wrong")
        }
    }
    const handleSignIn: SubmitHandler<SignInSchema> = async(data) => {
        const {email,password} = data; 
        try{
            const response = await signIn("credentials",data); 
            if(response?.error)
                throw new Error("Invalid credentials"); 

        }
        catch(err){
            toast.error("Invalid credentials")
        }
    }
    const customerSignIn = handleSubmit(handleSignIn)

    useEffect(()=>{
        if(session?.data?.user)
            router.push('/dashboard')
    },[session?.data?.user,router])

    return {
        register,
        signIn : customerSignIn, 
        providerSignIn : handleProviderSignIn, 
        errors
    }
}
