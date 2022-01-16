import React from "react";
import { InlineAreaChart } from "./inlineAreaChart";

import tailwindConfigFile from "../../tailwind.config.js";
import resolveConfig from "tailwindcss/resolveConfig";

export const tailwindConfig = () => {
  // Tailwind config
  return resolveConfig(tailwindConfigFile);
};

const hexToRGB = (h) => {
  let r = 0;
  let g = 0;
  let b = 0;
  if (h.length === 4) {
    r = `0x${h[1]}${h[1]}`;
    g = `0x${h[2]}${h[2]}`;
    b = `0x${h[3]}${h[3]}`;
  } else if (h.length === 7) {
    r = `0x${h[1]}${h[2]}`;
    g = `0x${h[3]}${h[4]}`;
    b = `0x${h[5]}${h[6]}`;
  }
  return `${+r},${+g},${+b}`;
};

export const LastHour: React.FC = (): JSX.Element => {
  const chartData = {
    labels: [
      "12-01-2020",
      "01-01-2021",
      "02-01-2021",
      "03-01-2021",
      "04-01-2021",
      "05-01-2021",
      "06-01-2021",
      "07-01-2021",
      "08-01-2021",
      "09-01-2021",
      "10-01-2021",
      "11-01-2021",
      "12-01-2021",
      "01-01-2022",
      "02-01-2022",
      "03-01-2022",
      "04-01-2022",
      "05-01-2022",
      "06-01-2022",
      "07-01-2022",
      "08-01-2022",
      "09-01-2022",
      "10-01-2022",
      "11-01-2022",
      "12-01-2022",
      "01-01-2023",
    ],
    datasets: [
      // Indigo line
      {
        data: [
          732, 610, 610, 504, 504, 504, 349, 349, 504, 342, 504, 610, 391, 192,
          154, 273, 191, 191, 126, 263, 349, 252, 423, 622, 470, 532,
        ],
        fill: true,
        backgroundColor: `rgba(${hexToRGB(
          tailwindConfig().theme.colors.blue[500]
        )}, 0.08)`,
        borderColor: tailwindConfig().theme.colors.indigo[500],
        borderWidth: 2,
        tension: 0.2,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.indigo[500],
        clip: 20,
      },
    ],
  };

  return (
    <div className="flex flex-col bg-white border border-gray-200 rounded-sm shadow-lg col-span-full xl:col-span-4">
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">
          Forwarded webhooks in the last hour
        </h2>
      </header>
      {/* Card content */}
      <div className="flex flex-col h-full">
        {/* Live visitors number */}
        <div className="px-5 py-3">
          <div className="flex items-center">
            {/* Red dot */}
            <div
              className="relative flex items-center justify-center w-4 h-4 mr-3 bg-green-100 rounded-full"
              aria-hidden="true"
            >
              <div className="absolute w-1.5 h-1.5 rounded-full bg-green-500 "></div>
            </div>
            {/* Vistors number */}
            <div>
              <div className="mr-2 text-3xl font-bold text-gray-800">347</div>
              <div className="text-sm text-gray-500">Forwarded webhooks</div>
            </div>
          </div>
        </div>

        {/* Chart built with Chart.js 3 */}
        <div>
          {/* Change the height attribute to adjust the chart height */}
          <InlineAreaChart data={chartData} width={389} height={70} />
        </div>

        {/* Table */}
        <div className="px-5 pt-3 pb-1 grow">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              {/* Table header */}
              <thead className="text-xs text-gray-400 uppercase">
                <tr>
                  <th className="py-2">
                    <div className="font-semibold text-left">Top Webhooks</div>
                  </th>
                  <th className="py-2">
                    <div className="font-semibold text-right">
                      Forwarded events
                    </div>
                  </th>
                </tr>
              </thead>
              {/* Table body */}
              <tbody className="text-sm divide-y divide-gray-100">
                {/* Row */}
                <tr>
                  <td className="py-2">
                    <div className="text-left">strapi.entry.create</div>
                  </td>
                  <td className="py-2">
                    <div className="font-medium text-right text-gray-800">
                      94
                    </div>
                  </td>
                </tr>
                {/* Row */}
                <tr>
                  <td className="py-2">
                    <div className="text-left">preview.cruip.com/simple/</div>
                  </td>
                  <td className="py-2">
                    <div className="font-medium text-right text-gray-800">
                      42
                    </div>
                  </td>
                </tr>
                {/* Row */}
                <tr>
                  <td className="py-2">
                    <div className="text-left">cruip.com/unlimited/</div>
                  </td>
                  <td className="py-2">
                    <div className="font-medium text-right text-gray-800">
                      12
                    </div>
                  </td>
                </tr>
                {/* Row */}
                <tr>
                  <td className="py-2">
                    <div className="text-left">preview.cruip.com/twist/</div>
                  </td>
                  <td className="py-2">
                    <div className="font-medium text-right text-gray-800">
                      4
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
