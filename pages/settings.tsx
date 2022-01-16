import React, { useState } from "react";
import { Navigation } from "components/navigation";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { NextPage } from "next";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Field, Form, handleSubmit } from "pkg/form";
import { LOCALSTORAGE_ENCRYPTION_KEY } from "pkg/constants";
const validation = z.object({
  encryptionKey: z.string().nonempty(),
});
const SettingsPage: NextPage = () => {
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const formContext = useForm<z.infer<typeof validation>>({
    mode: "onBlur",
    resolver: zodResolver(validation),
    defaultValues: {
      encryptionKey:
        window.localStorage.getItem(LOCALSTORAGE_ENCRYPTION_KEY) ?? "",
    },
  });

  return (
    <Navigation>
      <div className="w-full px-4 py-8 mx-auto sm:px-6 lg:px-8 max-w-9xl">
        <div className="m-auto mt-8">
          <Form ctx={formContext} formError={formError} className="grow">
            <div className="p-6 space-y-6">
              <h2 className="mb-5 text-2xl font-bold text-gray-800">
                Settings{" "}
              </h2>

              <section>
                <ul className="flex flex-col divide-y divide-y-gray-200">
                  <Field.Input
                    name="encryptionKey"
                    type="text"
                    label="Encryption Key"
                    description="All sensitive information such as connection details or kafka messages will never leave your browser. Only the required connection details are encrypted using this encryption key and then sent to the backend. In case you lose this key you will have
                     to add the clusters again."
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
                          window.localStorage.setItem(
                            LOCALSTORAGE_ENCRYPTION_KEY,
                            values.encryptionKey
                          );
                        },
                        setSubmitting,
                        setFormError
                      );
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </footer>
          </Form>
        </div>
      </div>
    </Navigation>
  );
};

export default withAuthenticationRequired(SettingsPage);
