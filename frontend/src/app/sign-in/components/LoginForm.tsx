'use client'
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UseFormRegister } from "react-hook-form"

const providers :Provider[]= ["github","google"]
type LoginFormProps ={
    providerSignIn : (provider? : Provider)=> void 
    signIn : ()=>void
    register : UseFormRegister<{
        email: string;
        password: string;
    }>
}
export default function LoginForm({providerSignIn,register,signIn}:LoginFormProps) {
  return (
    <Card className="flex flex-col  p-4 w-[350px]">
        <CardHeader>
            <CardTitle>Log in to tour account</CardTitle>
            <CardDescription>To join our experience.</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-y-4 relative">
            <div className="flex flex-col justify-between md:flex-row gap-4">
                {
                    providers.map((provider)=>(
                        <Button key={provider} onClick ={()=>{providerSignIn(provider)}} className="capitalize font-semibold ">{provider}</Button>
                    ))
                }
            </div>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or Continue With</span>
                </div>
               
            </div>
        </CardContent>

        <CardContent>
            <form onSubmit={signIn}>
            <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="example@gmail.com" {...register("email")} />
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">password</Label>
                    <Input id="password" placeholder="*********" {...register("password")} type="password" />
                </div>
            </div>
            </form>
        </CardContent>
        <CardFooter className="flex w-full">
            <Button type="submit" className="w-full">Sign In</Button>
        </CardFooter>
    </Card>
  )
}
