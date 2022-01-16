import { useQuery } from "react-query";
import { useFauna } from "pkg/fauna/provider";
import { Kafka } from "../kafka";
import { useCluster } from "./useCluster";
import { Message } from "../kafka/types";

export const useMessages = (
  clusterId: string,
  topic: string,
  partition: number,
  offset: number | undefined
) => {
  const { client } = useFauna();
  const { cluster } = useCluster(clusterId);
  const { data, ...meta } = useQuery<Message[], Error>(
    ["MESSAGES", topic, partition, offset],
    async () => {
      const kafka = new Kafka({
        url: cluster!.url,
        username: cluster!.username,
        password: cluster!.password,
      }).consumer();

      const res = await kafka.fetch({
        topic,
        partition,
        offset: offset!,
      });
      return res.sort((a, b) => b.timestamp - a.timestamp);
    },
    {
      enabled: !!client && !!cluster && typeof offset === "number",
    }
  );
  return { messages: data ?? [], ...meta };
};
