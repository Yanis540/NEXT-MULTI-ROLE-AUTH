'use client'
import { trpc } from '@/trpc/client'
import Image from 'next/image'

export default function Home() {
  const {data,isLoading} = trpc.tryingSomething.useQuery();
  console.log(data); 
  return (
  <main className="">
    <h1>HI</h1>
  </main>
  )
}

