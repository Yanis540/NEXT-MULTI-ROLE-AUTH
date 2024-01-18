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
import { SignUpSchema } from "@/lib/validators"

const providers :Provider[]= ["github","google"]
type SignUpFormProps ={
    signUp : ()=>void
    register : UseFormRegister<SignUpSchema>
}
export default function SignUpForm({register,signUp}:SignUpFormProps) {
  return (
    <Card className="flex flex-col  p-4 w-[350px]">
        <CardHeader>
            <CardTitle>Sign up to tour account</CardTitle>
            <CardDescription>To join our experience.</CardDescription>
        </CardHeader>

      

        <CardContent>
            <form onSubmit={signUp}>
                <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="john doe" {...register("name")} />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" placeholder="example@gmail.com" {...register("email")} />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="password">password</Label>
                        <Input id="password" placeholder="*********" {...register("password")} type="password" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input id="confirmPassword" placeholder="*********" {...register("confirmPassword")} type="password" />
                    </div>
                    <Button type="submit" className="w-full ">Sign Up</Button>
                </div>
            </form>
        </CardContent>
       
    </Card>
  )
}
