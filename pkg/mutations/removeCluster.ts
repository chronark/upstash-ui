import { useMutation, useQueryClient } from "react-query";
export type RemoveClusterRequest = {
  id: string;
};

import * as f from "faunadb";
import { useFauna } from "pkg/fauna/provider";
import { useAuth0 } from "@auth0/auth0-react";
import { QUERY_KEY_CLUSTERS } from "pkg/hooks/useClusters";

export const useRemoveCluster = () => {
  const { user } = useAuth0();
  const { client } = useFauna();
  const queryClient = useQueryClient();
  const { data, ...meta } = useMutation<void, Error, RemoveClusterRequest>(
    async (variables) => {
      const userId = user?.sub;
      if (!userId) {
        throw new Error("Can#t determine userId");
      }

      await client.query(
        f.Delete(
          f.Select(
            "ref",
            f.Get(f.Match(f.Index("kafka_cluster_by_id"), variables.id))
          )
        )
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEY_CLUSTERS);
      },
    }
  );

  return { ...meta };
};
