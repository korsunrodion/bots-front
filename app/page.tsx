import getBots from "@/api/getBots/getBots";
import Bots from "@/components/bots";
import Providers from "@/components/providers";
import queryClientConfig from "@/config/queryClientConfig";
import { dehydrate, QueryClient, HydrationBoundary } from "@tanstack/react-query";

export default async function Home() {
  const queryClient = new QueryClient({
    defaultOptions: queryClientConfig,
  });

  await queryClient.prefetchQuery({
    queryKey: ['bots'],
    queryFn: () => getBots()
  });

  return (
    <Providers>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Bots />
      </HydrationBoundary>
    </Providers>
  );
}
