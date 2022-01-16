import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "react-query";
import * as f from "faunadb";
import { z } from "zod";
import { newFaunaClient } from "pkg/fauna/provider";
import { Encryptor } from "pkg/encryption/aes";
import { Cluster, clusterValidation } from "pkg/db/types";
export const QUERY_KEY_CLUSTERS = ["CLUSTER"];
import { LOCALSTORAGE_ENCRYPTION_KEY } from "pkg/constants";
const responseValidation = z.object({
  data: z.array(
    z.object({
      data: clusterValidation,
    })
  ),
});

export const useClusters = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const { data, ...meta } = useQuery<Cluster[], Error>(
    QUERY_KEY_CLUSTERS,
    async () => {
      const client = newFaunaClient(await getAccessTokenSilently());
      const res = await client.query(
        f.Map(
          f.Paginate(f.Match(f.Index("kafka_clusters_by_user_id"), user!.sub!)),
          f.Lambda("X", f.Get(f.Var("X")))
        )
      );
      const parsed = responseValidation.parse(res);

      return parsed.data.map((c) => {
        const key = window.localStorage.getItem(LOCALSTORAGE_ENCRYPTION_KEY);
        if (!key) {
          console.error(`Unable to find key in localstorage`);
          throw new Error(`Unable to find key in localstorage`);
        }
        const dec = new Encryptor(key);
        return {
          ...c.data,
          url: dec.decrypt(c.data.url),
          username: dec.decrypt(c.data.username),
          password: dec.decrypt(c.data.password),
        };
      });
    },
    {
      enabled: !!user?.sub,
    }
  );
  return { clusters: data, ...meta };
};
