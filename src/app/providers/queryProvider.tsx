import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import type { ComponentType } from "react";
import { useState } from "react";

const withQueryProvider =
  (WrappedComponent: ComponentType) =>
  (props: Record<string, unknown>) => {
    const [queryClient] = useState(
      () =>
        new QueryClient({
          defaultOptions: {
            queries: {
              staleTime: 3 * 60 * 1000,
              refetchOnWindowFocus: false,
            },
          },
        }),
    );

    return (
      <QueryClientProvider client={queryClient}>
        <WrappedComponent {...props} />
      </QueryClientProvider>
    );
  };

export default withQueryProvider;
