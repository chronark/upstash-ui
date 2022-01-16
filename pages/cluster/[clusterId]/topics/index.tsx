import React from "react";
import { Navigation } from "components/navigation";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { NextPage } from "next";
import Link from "next/link";
import { useCluster } from "pkg/hooks/useCluster";
import { useRouter } from "next/router";
import { useTopics } from "pkg/hooks/useTopics";

function array(n: number): number[] {
  const arr: number[] = [];
  for (let i = 0; i < n; i++) {
    arr.push(i);
  }
  return arr;
}
const ClusterPage: NextPage = () => {
  const router = useRouter();
  const clusterId = router.query["clusterId"] as string;
  const { cluster } = useCluster(clusterId);
  const { topics } = useTopics(clusterId);
  return (
    <Navigation>
      <div className="w-full px-4 py-8 mx-auto sm:px-6 lg:px-8 max-w-9xl">
        <div className="mb-8 sm:flex sm:justify-between sm:items-center">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
              {cluster?.name}
            </h1>
          </div>

          {
            /* <div className="grid justify-start grid-flow-col gap-2 sm:auto-cols-max sm:justify-end">
            <Link href="/cluster/new">
              <a className="flex items-center p-2 text-white rounded bg-primary-900 hover:bg-primary-600">
                <Plus className="w-4 h-4" />
                <span className="ml-2">Add Cluster</span>
              </a>
            </Link>
          </div> */
          }
        </div>
        <div className="mt-8 space-y-8">
          <div>
            <div className="relative mb-8">
              <div
                className="absolute bottom-0 w-full h-px bg-gray-200"
                aria-hidden="true"
              >
              </div>
              <ul className="relative flex -mx-4 overflow-x-scroll text-sm font-medium flex-nowrap sm:-mx-6 lg:-mx-8 no-scrollbar">
                <li className="mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8">
                  <Link href={`/cluster/${clusterId}/topics`}>
                    <a className="block pb-3 border-b-2 text-primary-900 border-primary-900 whitespace-nowrap">
                      Topics
                    </a>
                  </Link>
                </li>
                <li className="mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8">
                  <Link href={`/cluster/${clusterId}/consumers`}>
                    <a className="block pb-3 text-gray-500 border-b hover:text-gray-600 whitespace-nowrap">
                      Consumers
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="m-auto mt-16">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              {/* Table header */}
              <thead className="text-xs text-gray-400 uppercase rounded-sm bg-gray-50">
                <tr>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Topic</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Partitions</div>
                  </th>{" "}
                  <th></th>
                </tr>
              </thead>
              {/* Table body */}
              <tbody className="text-sm divide-y divide-gray-100">
                {/* Row */}
                {Object.entries(topics ?? {}).map(([topic, partitions]) => {
                  return (
                    <tr key={topic}>
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="font-medium text-gray-800">
                            {topic}
                          </div>
                        </div>
                      </td>

                      <td className="p-2 whitespace-nowrap">
                        <div className="flex flex-wrap -space-x-px">
                          <div>
                            {array(partitions).map((p) => {
                              return (
                                <Link
                                  key={p}
                                  href={`/cluster/${clusterId}/topics/${topic}/partition/${p}`}
                                >
                                  <a className="text-gray-600 bg-white border-gray-200 rounded-none btn hover:bg-gray-50 first:rounded-l last:rounded-r">
                                    {p.toString()}
                                  </a>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Navigation>
  );
};

export default withAuthenticationRequired(ClusterPage);
