import { useQuery } from "react-query";
import { useFauna } from "pkg/fauna/provider";
import { Kafka } from "../kafka";
import { useCluster } from "./useCluster";
import { GetTopicsResponse } from "../kafka/admin";

export const useTopics = (clusterId: string) => {
  const { client } = useFauna();

  const { cluster } = useCluster(clusterId);

  const { data, ...meta } = useQuery<GetTopicsResponse, Error>(
    ["CLUSTER", clusterId, "TOPICS"],
    async () => {
      const kafka = new Kafka({
        url: cluster!.url,
        username: cluster!.username,
        password: cluster!.password,
      }).admin();
      const res = await kafka.topics().catch((err) => {
        console.warn(err);
        throw err;
      });
      return res;
    },
    {
      enabled: !!client && !!cluster,
    },
  );
  return { topics: data, ...meta };
};
