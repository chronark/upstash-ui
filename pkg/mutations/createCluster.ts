import { useMutation, useQueryClient } from "react-query";
import { LOCALSTORAGE_ENCRYPTION_KEY } from "pkg/constants";
export type CreateClusterRequest = Omit<Cluster, "id" | "userId">;
export type CreateClusterResponse = {
  id: string;
};

import * as f from "faunadb";
import { useFauna } from "pkg/fauna/provider";
import { useAuth0 } from "@auth0/auth0-react";
import { Encryptor } from "pkg/encryption/aes";
import { Cluster } from "pkg/db/types";
import { QUERY_KEY_CLUSTERS } from "pkg/hooks/useClusters";

export const useCreateCluster = () => {
  const { user } = useAuth0();
  const { client } = useFauna();
  const queryClient = useQueryClient();
  const { data, ...meta } = useMutation<
    CreateClusterResponse,
    Error,
    CreateClusterRequest
  >(
    async (variables) => {
      const userId = user?.sub;
      if (!userId) {
        throw new Error("Can#t determine userId");
      }
      const id = crypto!.randomUUID!();

      const encryptionKey = window.localStorage.getItem(
        LOCALSTORAGE_ENCRYPTION_KEY
      );
      if (!encryptionKey) {
        throw new Error(
          "No encryption key found in localstorage, please add one at /settings"
        );
      }
      window.localStorage.setItem(`ENCRYPTION_KEY_${id}`, encryptionKey);

      const encryptor = new Encryptor(encryptionKey);
      const data: Cluster = {
        id,
        userId,
        name: variables.name,
        description: variables.description,
        url: encryptor.encrypt(variables.url),
        username: encryptor.encrypt(variables.username),
        password: encryptor.encrypt(variables.password),
      };
      await client.query(
        f.Create(f.Collection("kafka_clusters"), {
          data,
        })
      );
      return {
        id,
      };
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEY_CLUSTERS);
      },
    }
  );

  return { cluster: data, ...meta };
};
