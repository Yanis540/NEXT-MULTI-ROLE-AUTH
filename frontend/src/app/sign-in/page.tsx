'use client'
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import React from 'react';
import LoginForm  from './components/LoginForm';
import { useAuth } from './hooks/use-auth';

interface SignInProps {

};

function SignIn({}:SignInProps) {

   const {signIn,providerSignIn,register} = useAuth(); 
    return (
    <MaxWidthWrapper className="flex-1 flex h-full  ">
        <div className="flex-1 flex flex-col items-center justify-center ">
           <LoginForm 
                register={register} 
                providerSignIn={providerSignIn} 
                signIn ={signIn}
            />
        </div>
    </MaxWidthWrapper>
    );
};

export default SignIn;