import React, { useEffect, useState } from "react";
import { z } from "zod";
import { Navigation } from "components/navigation";
import { useForm } from "react-hook-form";
import { Field, Form, handleSubmit } from "pkg/form";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { NextPage } from "next";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTopics } from "pkg/hooks/useTopics";
import { useRouter } from "next/router";
import { useProduceMessage } from "pkg/mutations/produceMessage";
import { useCluster } from "pkg/hooks/useCluster";

const validation = z.object({
  value: z.string().nonempty(),
  key: z.string().optional(),

  partition: z.string().transform((p) => parseInt(p)),
  timestamp: z.string().transform((p) => parseInt(p)),
  headerKeys: z.array(z.object({ value: z.string() })),
  headerValues: z.array(z.object({ value: z.string() })),
});
function array(n: number): number[] {
  const arr: number[] = [];
  for (let i = 0; i < n; i++) {
    arr.push(i);
  }
  return arr;
}
const ProducePage: NextPage = () => {
  const router = useRouter();
  const clusterId = router.query["clusterId"] as string;
  const topic = router.query["topic"] as string;
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const { topics } = useTopics(clusterId);

  const formContext = useForm<z.infer<typeof validation>>({
    mode: "onBlur",
    resolver: zodResolver(validation),
  });

  const { cluster } = useCluster(clusterId);

  const selectedTopic = Object.entries(topics ?? {}).find(([t]) => t === topic);

  const w = formContext.watch("headerKeys");
  useEffect(() => {
    console.log(JSON.stringify(w, null, 2));
  }, [w]);

  const produce = useProduceMessage(topic, cluster!);
  return (
    <Navigation>
      <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
        <Form ctx={formContext} formError={formError}>
          <div className="lg:relative lg:flex">
            <div className="px-4 sm:px-6 lg:px-8 py-8 lg:grow lg:pr-8 xl:pr-16 2xl:ml-[80px]">
              <div className="mb-8 sm:flex sm:justify-between sm:items-center">
                <div className="mb-4 sm:mb-0">
                  <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
                    Produce new message
                  </h1>
                </div>
              </div>

              <div>
                <Field.TextArea
                  label="Value"
                  name="value"
                  description="The message body"
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:sticky lg:top-16 bg-gray-50 lg:overflow-x-hidden lg:overflow-y-auto no-scrollbar lg:shrink-0 border-t lg:border-t-0 lg:border-l border-gray-200 w-1/2 lg:h-[calc(100vh-64px)]">
              <div className="px-4 py-8 lg:px-8 2xl:px-12">
                <div className="max-w-sm mx-auto lg:max-w-none">
                  <h2 className="mb-6 text-2xl font-bold text-gray-800">
                    {topic}
                  </h2>
                  <div className="space-y-6">
                    <div className="flex flex-col justify-between w-full py-3 text-sm border-b border-gray-200">
                      <Field.Select
                        name="partition"
                        label="Partition"
                        choices={array(
                          selectedTopic ? selectedTopic[1] : 0
                        ).map((p) => p.toString())}
                      />
                      <Field.Input name="key" label="Key" />

                      <Field.Input
                        name="timestamp"
                        label="Timestamp"
                        type="number"
                        defaultValue={Math.floor(Date.now())}
                      />
                    </div>
                    <div>
                      <div className="mb-2 font-semibold text-gray-800">
                        Headers
                      </div>
                      <ul className="mb-4">
                        <li className="flex justify-between w-full gap-4 py-3 text-sm border-b border-gray-200">
                          <Field.Expanding label="Headers" orientation="col" />
                        </li>
                      </ul>
                    </div>

                    <div className="mt-6">
                      <div className="mb-4">
                        <button
                          className="w-full text-white bg-primary-500 btn hover:bg-primary-600"
                          disabled={submitting}
                          type="button"
                          onClick={() => {
                            handleSubmit<z.infer<typeof validation>>(
                              formContext,
                              async (values) => {
                                const headers: {
                                  key: string;
                                  value: string;
                                }[] = [];
                                for (
                                  let i = 0;
                                  i < values.headerKeys.length;
                                  i++
                                ) {
                                  headers.push({
                                    key: values.headerKeys[i]!.value,
                                    value: values.headerValues[i]!.value,
                                  });
                                }
                                await produce.mutateAsync({
                                  topic,
                                  partition: 0,
                                  key: values.key,
                                  headers,
                                  timestamp: values.timestamp,
                                  value: values.value,
                                });
                              },
                              setSubmitting,
                              setFormError
                            );
                          }}
                        >
                          Create Endpoint
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </Navigation>
  );
};

export default withAuthenticationRequired(ProducePage);
