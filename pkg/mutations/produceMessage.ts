import { useMutation, useQueryClient } from "react-query";
import { Kafka } from "pkg/kafka";
import { ProduceRequest } from "pkg/kafka/producer";
import { Cluster } from "pkg/db/types";
export type ProduceMessageResponse = {
  offset: number;
};

export const useProduceMessage = (topic: string, cluster: Cluster) => {
  const queryClient = useQueryClient();
  const { data, ...meta } = useMutation<
    ProduceMessageResponse,
    Error,
    ProduceRequest
  >(
    async (variables) => {
      const kafka = new Kafka({
        url: cluster.url,
        username: cluster.username,
        password: cluster.password,
      }).producer();

      const res = await kafka.produce(variables.topic, variables.value, {
        key: variables.key,
        partition: variables.partition,
        timestamp: variables.timestamp,
        headers: variables.headers,
      });

      return { offset: res.offset };
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["MESSAGES", topic]);
      },
    }
  );

  return { message: data, ...meta };
};
