import {z} from 'zod'

export const signInSchema = z.object({
    email : z.string().email(), 
    password : z.string()
})
export type SignInSchema = z.infer<typeof signInSchema>; 

export const signUpSchema = z.object({
    name : z.string().min(1), 
    email: z.string().email(), 
    password : z.string().min(1),
    confirmPassword : z.string().min(1),

}).superRefine(({password,confirmPassword},context)=>{
    if(password?.length!=0) 
        if(password!=confirmPassword)
            context.addIssue({
                code:'custom', 
                message:"The passwords did not match"
            });
})
export type SignUpSchema = z.infer<typeof signUpSchema>; 