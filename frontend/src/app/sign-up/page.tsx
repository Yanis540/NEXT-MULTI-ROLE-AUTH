'use client'
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import React from 'react';
import SignUpForm  from './components/SignUpForm';
import { useSignUp } from './hooks/use-sign-up';

interface SignUpProps {

};

function SignUp({}:SignUpProps) {

   const {signUp,register} = useSignUp(); 
    return (
    <MaxWidthWrapper className="flex-1 flex h-full  ">
        <div className="flex-1 flex flex-col items-center justify-center ">
           <SignUpForm 
                register={register} 
                signUp ={signUp}
            />
        </div>
    </MaxWidthWrapper>
    );
};

export default SignUp;