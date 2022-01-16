import { useQuery } from "react-query";
import * as f from "faunadb";
import { z } from "zod";
import { newFaunaClient } from "pkg/fauna/provider";
import { Encryptor } from "pkg/encryption/aes";
import { Cluster, clusterValidation } from "pkg/db/types";
import { useAuth0 } from "@auth0/auth0-react";
import { LOCALSTORAGE_ENCRYPTION_KEY } from "pkg/constants";

const responseValidation = z.object({
  data: clusterValidation,
});

export const useCluster = (clusterId: string) => {
  const { getAccessTokenSilently } = useAuth0();
  const { data, ...meta } = useQuery<Cluster, Error>(
    ["CLUSTER", clusterId],
    async () => {
      const client = newFaunaClient(await getAccessTokenSilently());
      const res = await client.query(
        f.Get(f.Match(f.Index("kafka_cluster_by_id"), clusterId)),
      );
      const key = window.localStorage.getItem(LOCALSTORAGE_ENCRYPTION_KEY);
      if (!key) {
        console.error(`Unable to find key in localstorage`);
        throw new Error(`Unable to find key in localstorage`);
      }
      const dec = new Encryptor(key);

      const parsed = responseValidation.parse(res);

      return {
        ...parsed.data,
        url: dec.decrypt(parsed.data.url),
        username: dec.decrypt(parsed.data.username),
        password: dec.decrypt(parsed.data.password),
      };
    },
  );
  return { cluster: data, ...meta };
};
