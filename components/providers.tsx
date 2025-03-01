'use client';

import queryClientConfig from "@/config/queryClientConfig";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClientGlobal = new QueryClient({
  defaultOptions: queryClientConfig,
});

type Props = {
  children: React.ReactNode;
}

const Providers: React.FC<Props> = ({ children }) => {
  let queryClient;
  if (typeof window === "undefined") {
    queryClient = new QueryClient();
  } else {
    queryClient = queryClientGlobal;
  }

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

export default Providers;