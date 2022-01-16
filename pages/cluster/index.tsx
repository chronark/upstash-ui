import React from "react";
import { Navigation } from "components/navigation";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { NextPage } from "next";
import { ArrowRight, Box, Plus } from "react-feather";

import Link from "next/link";
import { useClusters } from "pkg/hooks/useClusters";

const ClustersPage: NextPage = () => {
  const { clusters, error } = useClusters();
  if (error) {
    console.error(error);
  }
  return (
    <Navigation>
      <div className="w-full px-4 py-8 mx-auto sm:px-6 lg:px-8 max-w-9xl">
        {/* Page header */}
        <div className="mb-8 sm:flex sm:justify-between sm:items-center">
          {/* Left: Title */}
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
              {clusters && clusters.length > 0
                ? "Your active clusters"
                : "Looks like you haven't added any clusters yet"}
            </h1>
          </div>

          {/* Right: Actions */}
          <div className="grid justify-start grid-flow-col gap-2 sm:auto-cols-max sm:justify-end">
            {/* Add board button */}
            <Link href="/cluster/new">
              <a className="flex items-center p-2 text-white rounded bg-primary-900 hover:bg-primary-600">
                <Plus className="w-4 h-4" />
                <span className="ml-2">Add Cluster</span>
              </a>
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-200">
          <div className="m-auto mt-16">
            {clusters ? (
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  {/* Table header */}
                  <thead className="text-xs text-gray-400 uppercase rounded-sm bg-gray-50">
                    <tr>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Name</div>
                      </th>{" "}
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">URL</div>
                      </th>
                      <th></th>
                    </tr>
                  </thead>
                  {/* Table body */}
                  <tbody className="text-sm divide-y divide-gray-100">
                    {/* Row */}
                    {clusters.map((cluster) => {
                      return (
                        <tr key={cluster.id}>
                          <td className="p-2 whitespace-nowrap">
                            <div className="flex items-center">
                              <div>{cluster.name}</div>
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left">{cluster.url}</div>
                          </td>
                          <td className="w-8 p-2 whitespace-nowrap">
                            <Link href={`/cluster/${cluster.id}/topics`}>
                              <a className="flex items-center p-2 text-white rounded bg-primary-900 hover:bg-primary-600">
                                <ArrowRight className="w-4 h-4" />
                              </a>
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex flex-col items-center px-4 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-t from-gray-200 to-gray-100">
                  <Box />
                </div>
                <h2 className="mb-2 text-2xl font-bold text-gray-800">
                  Create your first cluser{" "}
                </h2>
                <div className="mb-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>
                <Link href="/cluster/new">
                  <a className="flex items-center p-2 text-white rounded bg-primary-900 hover:bg-primary-600">
                    <Plus className="w-4 h-4" />
                    <span className="ml-2">Add cluster</span>
                  </a>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </Navigation>
  );
};

export default withAuthenticationRequired(ClustersPage);
