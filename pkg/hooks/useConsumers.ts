import { useQuery } from "react-query";
import { useFauna } from "pkg/fauna/provider";
import { Kafka } from "../kafka";
import { useCluster } from "./useCluster";
import { GroupAssignments } from "../kafka/admin";

export const useConsumers = (clusterId: string) => {
  const { client } = useFauna();

  const { cluster } = useCluster(clusterId);

  const { data, ...meta } = useQuery<GroupAssignments[], Error>(
    [clusterId, "CONSUMERS"],
    async () => {
      const kafka = new Kafka({
        url: cluster!.url,
        username: cluster!.username,
        password: cluster!.password,
      }).admin();
      const res = await kafka.consumers().catch((err) => {
        console.warn(err);
        throw err;
      });
      return res;
    },
    {
      enabled: !!client && !!cluster,
    }
  );
  return { consumers: data ?? [], ...meta };
};
