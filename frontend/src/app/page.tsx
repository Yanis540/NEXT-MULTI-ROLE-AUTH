'use client'
import { trpc } from '@/trpc/client'

export default function Home() {
  const {data,error,isLoading} = trpc.user.current.useQuery();
  console.log(data,error); 
  return (
  <main className="">
    <h1>HI</h1>
  </main>
  )
}

