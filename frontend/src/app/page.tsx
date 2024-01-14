'use client'
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { trpc } from '@/trpc/client'

export default function Home() {
  const {data,error,isLoading} = trpc.tryingSomething.useQuery();
  console.log(data); 
  return (
  <MaxWidthWrapper>
    <main className="bg-priamry">
      <h1 className="text-primary">Main page </h1>
    </main>
  </MaxWidthWrapper>
  )
}

