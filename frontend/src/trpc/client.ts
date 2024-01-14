import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from './';

import { createTRPCReact } from "@trpc/react-query";

export const trpc = createTRPCReact<AppRouter>();