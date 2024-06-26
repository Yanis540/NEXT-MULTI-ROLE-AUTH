import { appRouter } from "@/trpc";
import { createContext } from "@/trpc/context";
import {
    FetchCreateContextFnOptions,
    fetchRequestHandler,
  } from "@trpc/server/adapters/fetch";
  
const handler = (request: Request) => {
    console.log(`incoming request ${request.url}`);
    return fetchRequestHandler({
      endpoint: "/api/trpc",
      req: request,
      router: appRouter,
      createContext: createContext as any
    });
  };
  
  export { handler as GET, handler as POST };