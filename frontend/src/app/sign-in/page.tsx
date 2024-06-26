'use client'
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import React from 'react';
import LoginForm  from './components/LoginForm';
import { useSignIn } from './hooks/use-sign-in';

interface SignInProps {

};

function SignIn({}:SignInProps) {

   const {signIn,providerSignIn,register} = useSignIn(); 
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