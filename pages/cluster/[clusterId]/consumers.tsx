import React, { useEffect } from "react";
import { Navigation } from "components/navigation";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { NextPage } from "next";
import Link from "next/link";
import { useCluster } from "pkg/hooks/useCluster";
import { useRouter } from "next/router";
import { useConsumers } from "pkg/hooks/useConsumers";
import { Activity } from "react-feather";
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
  const { consumers } = useConsumers(clusterId);
  useEffect(() => {
    consumers[0]?.instances[0]?.topics.push({
      topic: "Hello.world",
      partitions: [1, 4, 6],
    });
    consumers.push({
      name: "Hello World",
      instances: [
        { name: "Instance", topics: [{ topic: "no", partitions: [1, 2, 3] }] },
        {
          name: "Instance2",
          topics: [
            { topic: "no", partitions: [1, 2, 3] },
            { topic: "no", partitions: [1, 2, 3] },
          ],
        },
      ],
    });
  }, [consumers]);
  return (
    <Navigation>
      <div className="w-full px-4 py-8 mx-auto sm:px-6 lg:px-8 max-w-9xl">
        <div className="mb-8 sm:flex sm:justify-between sm:items-center">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
              {cluster?.name}
            </h1>
          </div>
        </div>
        <div className="mt-8 space-y-8">
          <div>
            <div className="relative mb-8">
              <div
                className="absolute bottom-0 w-full h-px bg-gray-200"
                aria-hidden="true"
              ></div>
              <ul className="relative flex -mx-4 overflow-x-scroll text-sm font-medium flex-nowrap sm:-mx-6 lg:-mx-8 no-scrollbar">
                <li className="mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8">
                  <Link href={`/cluster/${clusterId}/topics`}>
                    <a className="block pb-3 text-gray-900 whitespace-nowrap">
                      Topics
                    </a>
                  </Link>
                </li>
                <li className="mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8">
                  <Link href={`/cluster/${clusterId}/consumers`}>
                    <a className="block pb-3 border-b-2 text-primary-900 border-primary-900 whitespace-nowrap">
                      Consumers
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="m-auto mt-16">
          <div className="">
            {/* Post */}
            {consumers.map((consumer) => {
              return (
                <div className="pt-12">
                  <div className="">
                    <h2 className="mb-4 text-xl font-bold leading-snug text-gray-800 xl:leading-7 ">
                      {consumer.name}
                    </h2>

                    <div className=" grow">
                      <ul className="-my-2">
                        {consumer.instances.map((instance) => {
                          return (
                            <li className="relative my-2 ">
                              <div className="flex items-center mb-1">
                                <div
                                  className="absolute left-0 h-full w-0.5 bg-gray-200 self-start ml-2.5 -translate-x-1/2"
                                  aria-hidden="true"
                                ></div>

                                <h3 className="text-lg font-bold text-gray-800 pl-9">
                                  {instance.name}
                                </h3>
                              </div>
                              <div className="pl-9">
                                <div className="px-5 pt-3 pb-1 grow">
                                  <div className="overflow-x-auto">
                                    <table className="w-full table-auto">
                                      {/* Table header */}
                                      <thead className="text-xs text-gray-400 uppercase">
                                        <tr>
                                          <th className="py-2">
                                            <div className="font-semibold text-left">
                                              Topic{" "}
                                            </div>
                                          </th>
                                          <th className="py-2">
                                            <div className="font-semibold text-right">
                                              Partitions{" "}
                                            </div>
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody className="text-sm divide-y divide-gray-100">
                                        {instance.topics.map(
                                          ({ topic, partitions }) => {
                                            return (
                                              <tr>
                                                <td className="py-2">
                                                  <div className="text-left">
                                                    {topic}
                                                  </div>
                                                </td>
                                                <td className="py-2">
                                                  <div className="font-medium text-right text-gray-800">
                                                    {partitions.map((p) => {
                                                      return (
                                                        <Link
                                                          href={`/cluster/${clusterId}/topics/${topic}/partition/${p}`}
                                                        >
                                                          <a className="text-gray-600 bg-white border-gray-200 rounded-none btn hover:bg-gray-50 first:rounded-l last:rounded-r">
                                                            {p.toString()}
                                                          </a>
                                                        </Link>
                                                      );
                                                    })}
                                                  </div>
                                                </td>
                                              </tr>
                                            );
                                          }
                                        )}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Navigation>
  );
};

export default withAuthenticationRequired(ClusterPage);
