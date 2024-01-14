import React from 'react';
import MaxWidthWrapper from './MaxWidthWrapper';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import NavItems from './NavItems';
import { buttonVariants } from './ui/button';
import UserAccountNav from './UserAccountNav';
import { ModeToggle } from './ModeToggle';

interface NavbarProps {

};

async function Navbar({}:NavbarProps) {
    const session = await getServerSession(); 
    const {user=null} = session || {};
     
    return (
    <div className="bg-background sticky z-50 top-0  inset-x-0 h-16 ">
        <header className='relative bg-background'>
            <MaxWidthWrapper>
                <div className="border-b border-foreground">
                    <div className='flex h-16 items-center'>
                        {/* TODO : mobile NAV */}

                        <div className="ml-4 flex lg:ml-0">
                            <Link href="/">
                                <h1>Some logo</h1>
                            </Link>
                        </div>

                        <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch ">
                            <NavItems /> 
                        </div>
                        <div className="ml-auto flex items-center">
                        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                            {user?null : <Link href="/sign-in" className={buttonVariants({variant:"ghost"})}>Sign In</Link>}
                            {user?null : <span  className="h-6 w-px bg-foreground" aria-hidden="true" />}
                                {
                                    user ?(
                                        <UserAccountNav user={user} /> 
                                    ):(
                                    <Link href="/sign-up" className={buttonVariants({variant:"ghost"})}>Sign Up </Link>
                                    )
                                }
                                {user?<span  className="h-6 w-px bg-foreground" aria-hidden="true" /> :null }
                                {user?null : <div className="flex lg:ml-6">
                                    <span  className="h-6 w-px bg-foreground" aria-hidden="true" />
                                </div>}
                                <ModeToggle />
                            </div>
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </header>
     </div>
    );
};

export default Navbar;