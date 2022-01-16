import React from "react";
import { Navigation } from "components/navigation";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { NextPage } from "next";

import Link from "next/link";

const IndexPage: NextPage = () => {
  return (
    <Navigation>
      <div className="w-full px-4 py-8 mx-auto sm:px-6 lg:px-8 max-w-9xl">
        {/* Page header */}
        <div className="mb-8 sm:flex sm:justify-between sm:items-center">
          {/* Left: Title */}
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
              Welcome
            </h1>
          </div>
        </div>

        <div className="border-t border-gray-200">
          <main>
            <div className="w-full px-4 py-8 mx-auto sm:px-6 lg:px-8 max-w-9xl">
              <div className="m-auto mt-16">
                <div className="flex flex-col gap-8 px-4 text-center">
                  <div>
                    If this is the first time you logged in then please head
                    over to the{"  "}
                    <Link href="/settings">
                      <a className="underline text-primary-600 hover:text-primary-900">
                        settings
                      </a>
                    </Link>{" "}
                    and add a new encryption key.
                  </div>
                  <div>
                    Otherwise you can head straight to{" "}
                    <Link href="/cluster">
                      <a className="underline text-primary-600 hover:text-primary-900">
                        your clusters
                      </a>
                    </Link>
                    .
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Navigation>
  );
};

export default withAuthenticationRequired(IndexPage);
