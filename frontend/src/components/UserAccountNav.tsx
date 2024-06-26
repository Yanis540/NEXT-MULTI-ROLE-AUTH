'use client'
import React, { useEffect } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from './ui/button';
import Link from 'next/link';
import { signOut } from "next-auth/react"
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useStoreUser } from '@/hooks/use-user';

interface UserAccountNavProps {
    user: User
};

function UserAccountNav({user}:UserAccountNavProps) {
    const {set_user} = useStoreUser(); 

    const router = useRouter(); 
    const handleSignOut = ()=>{
        signOut({
           redirect : false
        }).then(()=> {
            router.push('/'); 
            set_user(undefined); 
        })
      
    }
    useEffect(()=>{
        set_user(user);

    },[user,set_user])
    return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild className='overflow-visible'>
            <Button variant='ghost' size='sm' className='relative'>
                My account
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white w-60" align="end">
            <div className="flex items-center justify-start gap-2 p-2 ">
                <div className="flex flex-col space-y-0.5 leading-none">
                    <p className="font-medium text-sm text-black ">{user?.name}</p>
                </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                {
                    user?.role == 'admin' ? (
                        <Link href='/admin'>Admin</Link>
                    ): (
                        <Link href='/dashboard'>Some dashboard</Link>
                    )
                }
                
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>Log Out</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    );
};

export default UserAccountNav;