'use client'
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import React from 'react';
import LoginForm  from './components/LoginForm';

import { signIn } from "next-auth/react"
import {SubmitHandler, useForm} from 'react-hook-form'
import { SignInSchema } from '@/lib/validators';
import { toast } from 'sonner';
interface SignInProps {

};

function SignIn({}:SignInProps) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<SignInSchema>(); 
    const handleProviderSignIng = async(provider ? : Provider)=>{
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
   
    return (
    <MaxWidthWrapper className="flex-1 flex h-full  ">
        <div className="flex-1 flex flex-col items-center justify-center ">
           <LoginForm 
                register={register} 
                providerSignIn={handleProviderSignIng} 
                signIn ={handleSubmit(handleSignIn)}
            />
        </div>
    </MaxWidthWrapper>
    );
};

export default SignIn;