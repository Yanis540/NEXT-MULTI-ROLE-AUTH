"use client"
import React, { ReactNode, useState } from 'react';
import {
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'
import { trpc } from '@/trpc/client';
import { getFetch, httpBatchLink } from '@trpc/client';

interface TRPCContextProps {
    children : ReactNode | ReactNode[] | null
};

function TRPCContext({children}:TRPCContextProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { staleTime: 5000 } },
      })
  );

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        
        httpBatchLink({
          url:`${process.env.NEXT_PUBLIC_URL}/api/trpc`,
          fetch: async (input, init?) => {
            const fetch = getFetch();
            return fetch(input, {
              ...init,
              credentials: "include",
            });
          },
          
        }),
      ],
    
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default TRPCContext;