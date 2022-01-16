import React, { useState } from "react";
import { Navigation } from "components/navigation";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { NextPage } from "next";
import { ChevronDown, ChevronUp, Plus } from "react-feather";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMessages } from "pkg/hooks/useMessages";
function format(raw: string): string {
  try {
    return JSON.stringify(JSON.parse(raw), null, 2);
  } catch (_err) {
    return raw;
  }
}

type RowProps = {
  message: {
    timestamp: number;
    key?: string;
    value: string;
    offset: number;
    headers: { key: string; value: string }[];
  };
};

const Row: React.FC<RowProps> = ({
  message: { timestamp, key, value, offset, headers },
}): JSX.Element => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <tr>
        <td className="p-2 whitespace-nowrap">
          {new Date(timestamp).toLocaleString()}
        </td>
        <td className="p-2 whitespace-nowrap">{key}</td>
        <td className="p-2 whitespace-nowrap">{offset}</td>
        <td className="p-2 whitespace-nowrap">
          <span className="p-2 font-mono text-gray-700 bg-gray-100 rounded-sm text-ellipsis">
            {JSON.stringify(headers).slice(0, 100)}
          </span>
        </td>
        <td className="p-2 whitespace-nowrap">
          <span className="p-2 font-mono text-gray-700 bg-gray-100 rounded-sm text-ellipsis">
            {value.slice(0, 100)}
          </span>
        </td>
        <td>
          <button
            onClick={() => setOpen(!open)}
            className="flex flex-row w-full hover:bg-gray-50"
          >
            {open ? <ChevronUp /> : <ChevronDown />}
          </button>
        </td>
      </tr>
      {open ? (
        <tr>
          <td colSpan={5}>
            <div className="flex items-start justify-between w-full gap-8 px-2 py-8 lg:relative lg:flex ">
              <div className="flex-grow w-2/3">
                <pre className="p-4 font-mono bg-gray-50">{format(value)}</pre>
              </div>

              {/* Sidebar */}
              <div className="w-1/3">
                <div className="border-t border-gray-200 lg:sticky lg:top-16 bg-gray-50 lg:overflow-x-hidden lg:overflow-y-auto no-scrollbar lg:shrink-0 lg:border-t-0">
                  <div className="px-4 py-8 lg:px-8 2xl:px-12">
                    <div className="max-w-sm mx-auto lg:max-w-none">
                      <div className="space-y-6">
                        {/* Order summary */}
                        <div>
                          <div className="mb-2 font-semibold text-gray-800">
                            Message
                          </div>
                          <ul className="mb-4">
                            <li className="flex justify-between w-full py-3 text-sm border-b border-gray-200">
                              <div>Timestamp</div>
                              <div className="font-medium text-gray-800">
                                {new Date(timestamp).toLocaleString()}
                              </div>
                            </li>
                            <li className="flex justify-between w-full py-3 text-sm border-b border-gray-200">
                              <div>Key</div>
                              <div className="p-1 font-mono font-medium text-gray-600 bg-gray-100 ">
                                {key}
                              </div>
                            </li>{" "}
                            <li className="flex justify-between w-full py-3 text-sm border-b border-gray-200">
                              <div>Offset</div>
                              <div className="p-1 font-medium text-gray-600 ">
                                {offset.toString()}
                              </div>
                            </li>
                          </ul>
                        </div>

                        {/* Payment Details */}
                        <div>
                          <div className="mb-4 font-semibold text-gray-800">
                            Headers
                          </div>
                          <div className="space-y-4">
                            <ul className="mb-4">
                              {headers.map(({ key, value }) => {
                                return (
                                  <li key={key} className="flex justify-between w-full py-2 text-xs border-b border-gray-200">
                                    <pre>{key}</pre>
                                    <pre className="font-medium text-gray-800">
                                      {value}
                                    </pre>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      ) : null}
    </>
  );
};

const ClusterPage: NextPage = () => {
  const router = useRouter();
  const clusterId = router.query["clusterId"] as string;
  const topic = router.query["topic"] as string;
  const partition = parseInt(router.query["partition"] as string);
  const [offset, setOffset] = useState<number | undefined>(undefined);
  const { messages } = useMessages(clusterId, topic, partition, offset);
  return (
    <Navigation>
      <div className="w-full px-4 py-8 mx-auto sm:px-6 lg:px-8 max-w-9xl">
        {/* Page header */}
        <div className="mb-8 sm:flex sm:justify-between sm:items-center">
          {/* Left: Title */}
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
              Messages
            </h1>
          </div>

          {/* Right: Actions */}
          <div className="grid items-end justify-start grid-flow-col gap-2 sm:auto-cols-max sm:justify-end">
            <div>
              <label
                className="block mb-1 text-sm font-medium"
                htmlFor="default"
              >
                Offset
              </label>
              <input
                id="default"
                className="w-full form-input"
                type="number"
                value={offset}
                min={0}
                onChange={(e) => setOffset(parseInt(e.currentTarget.value))}
              />
            </div>
            <Link href={`/cluster/${clusterId}/topics/${topic}/produce`}>
              <a className="flex items-center p-2 text-white rounded bg-primary-900 hover:bg-primary-600">
                <Plus className="w-4 h-4" />
                <span className="ml-2">Produce new message</span>
              </a>
            </Link>
          </div>
        </div>

        {messages.length === 0 ? (
          <div className="border-t border-gray-200">
            <div className="max-w-2xl m-auto mt-16">
              <div className="px-4 text-center">
                <h2 className="mb-2 text-2xl font-bold text-gray-800">
                  No messages found{" "}
                </h2>
                <div className="mb-6">
                  Either you have not selected an offset in the top right corner
                  or the offset is too high and this partition has not reached it
                  yet. Try a smaller number.
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="m-auto mt-16">
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                {/* Table header */}
                <thead className="text-xs text-gray-400 uppercase rounded-sm bg-gray-50">
                  <tr>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Time</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Key</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Offset</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Headers</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Value</div>
                    </th>
                    <th></th>
                  </tr>
                </thead>
                {/* Table body */}
                <tbody className="text-sm divide-y divide-gray-100">
                  {/* Row */}
                  {messages.map((message, i) => {
                    return <Row key={i} message={message} />;
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Navigation>
  );
};

export default withAuthenticationRequired(ClusterPage);
