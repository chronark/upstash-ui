import { env } from "@chronark/env";
import { QueryClient } from "react-query";
import { createWebStoragePersistor } from "react-query/createWebStoragePersistor-experimental";
import { persistQueryClient } from "react-query/persistQueryClient-experimental";
export const PersistendQueryClient = (): QueryClient => {
  const queryClient = new QueryClient();

  const PERSIST_QUERIES = true;
  /**
   * We obviously cannot use a localstorage persistor serverside.
   */
  if (PERSIST_QUERIES && typeof window !== "undefined") {
    persistQueryClient({
      queryClient,
      persistor: createWebStoragePersistor({ storage: window.localStorage }),
      /**
       * A new deployment will invalidate the cache
       */
      buster: env.get("NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA"),
    });
  }
  return queryClient;
};
