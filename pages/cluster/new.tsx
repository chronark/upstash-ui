import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Navigation } from "components/navigation";
import { useForm } from "react-hook-form";
import { Field, Form, handleSubmit } from "pkg/form";
import { useCreateCluster } from "pkg/mutations/createCluster";
import { NextPage } from "next";

const validation = z.object({
  name: z.string().nonempty(),
  description: z.string(),
  url: z.string().nonempty(),
  username: z.string().nonempty(),
  password: z.string().nonempty(),
});

const Cluster: NextPage = () => {
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const formContext = useForm<z.infer<typeof validation>>({
    mode: "onBlur",
    resolver: zodResolver(validation),
  });
  const createCluster = useCreateCluster();

  return (
    <Navigation>
      <div className="w-full px-4 py-8 mx-auto sm:px-6 lg:px-8 max-w-9xl">
        {/* Page header */}
        <div className="mb-8">
          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
            Add a new Cluster
          </h1>
        </div>

        <div className="mb-8 bg-white rounded-sm shadow-lg">
          <div className="flex flex-col md:flex-row md:-mr-px">
            <Form ctx={formContext} formError={formError} className="grow">
              <div className="p-6 space-y-6">
                <h2 className="mb-5 text-2xl font-bold text-gray-800">
                  New Endpoint
                </h2>

                <section>
                  <ul className="flex flex-col divide-y divide-y-gray-200">
                    <Field.Input
                      name="name"
                      label="Name"
                      description="Give this kafka cluster a recognizable name."
                    />
                    <Field.Input
                      name="description"
                      label="Description"
                      description="Optionally give your cluster a description."
                    />

                    <Field.Input
                      name="url"
                      label="Url"
                      description="The UPSTASH_KAFKA_REST_URL from Upstash"
                    />
                    <Field.Input
                      name="username"
                      label="Username"
                      description="The UPSTASH_KAFKA_REST_USERNAME from Upstash"
                      type="password"
                    />
                    <Field.Input
                      name="password"
                      label="Password"
                      type="password"
                      description="The UPSTASH_KAFKA_REST_PASSWORD from Upstash"
                    />
                  </ul>
                </section>
              </div>

              <footer>
                <div className="flex flex-col px-6 py-5 border-t border-gray-200">
                  <div className="flex self-end">
                    <button
                      className="ml-3 text-white bg-primary-900 btn hover:bg-primary-600"
                      disabled={submitting}
                      type="button"
                      onClick={() => {
                        handleSubmit<z.infer<typeof validation>>(
                          formContext,
                          async (values) => {
                            await createCluster.mutateAsync(values);
                          },
                          setSubmitting,
                          setFormError,
                        );
                      }}
                    >
                      Create Endpoint
                    </button>
                  </div>
                </div>
              </footer>
            </Form>
          </div>
        </div>
      </div>
    </Navigation>
  );
};

export default Cluster;
