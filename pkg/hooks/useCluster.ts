import { useQuery } from "react-query";
import * as f from "faunadb";
import { z } from "zod";
import { useFauna } from "pkg/fauna/provider";
import { Encryptor } from "pkg/encryption/aes";
import { Cluster, clusterValidation } from "pkg/db/types";

const responseValidation = z.object({
  data: clusterValidation,
});

export const useCluster = (clusterId: string) => {
  const { client } = useFauna();
  const { data, ...meta } = useQuery<Cluster, Error>(
    clusterId,
    async () => {
      const res = await client.query(
        f.Get(f.Match(f.Index("kafka_cluster_by_id"), clusterId))
      );
      const key = window.localStorage.getItem(`ENCRYPTION_KEY_${clusterId}`);
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
    {
      enabled: !!client,
    }
  );
  return { cluster: data, ...meta };
};
