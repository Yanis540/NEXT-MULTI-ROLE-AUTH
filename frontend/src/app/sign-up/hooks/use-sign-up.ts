import { useSession } from "next-auth/react"
import {SubmitHandler, useForm} from 'react-hook-form'
import { SignUpSchema, signUpSchema } from '@/lib/validators';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { trpc } from "@/trpc/client";
import {toast} from 'sonner'
import { TRPCError } from "@trpc/server";
import {zodResolver} from '@hookform/resolvers/zod'

export const useSignUp = ()=>{
    const router = useRouter(); 
    const session = useSession(); 
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<SignUpSchema>({
        resolver : zodResolver(signUpSchema)
    }); 
    const {mutate:signUp,error} = trpc.user.signUp.useMutation({
        onSuccess : ({success})=>{

            toast.success("Signed up correctly"); 
            router.push('/sign-in')
        }, 
        onError: (err)=>{
            if(err instanceof TRPCError){
                toast.error(err.message)
            }
            else 
                toast.message("Something went wrong, please try later"); 
        }
    });
  
    
   
    const handleSignUp: SubmitHandler<SignUpSchema> = async(data) => {
        // console.log(data); 
        signUp(data); 
    }
    const customerSignUp = handleSubmit(handleSignUp)

    useEffect(()=>{
        if(session?.data?.user)
            router.push('/dashboard')
    },[session?.data?.user,router])

    return {
        register,
        signUp : customerSignUp, 
        errors
    }
}
