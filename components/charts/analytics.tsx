import React from "react";
import { AreaChart } from "./areaChart";
import tailwindConfigFile from "../../tailwind.config.js";
import resolveConfig from "tailwindcss/resolveConfig";

export const tailwindConfig = () => {
  // Tailwind config
  return resolveConfig(tailwindConfigFile);
};

const hexToRGB = (h: string) => {
  let r: string | number = 0;
  let g: string | number = 0;
  let b: string | number = 0;
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

type StatsProps = {
  value: string;
  change?: number;
  label: string;
};

const Stats: React.FC<StatsProps> = ({ value, change, label }): JSX.Element => {
  return (
    <div className="flex items-center">
      <div>
        <div className="flex items-center">
          <div className="mr-2 text-3xl font-bold text-gray-800">{value}</div>
          {change ? (
            <div
              className={`text-sm font-medium ${
                change > 0 ? "text-green-500" : "text-yellow-500"
              }`}
            >
              {change > 0 ? "+" : "-"}
              {(change * 100).toFixed(0)}%
            </div>
          ) : null}
        </div>
        <div className="text-sm text-gray-500">{label}</div>
      </div>
    </div>
  );
};

export const AnalyticsChart: React.FC = (): JSX.Element => {
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
      {
        data: [
          5000, 8700, 7500, 12000, 11000, 9500, 10500, 10000, 15000, 9000,
          10000, 7000, 22000, 7200, 9800, 9000, 10000, 8000, 15000, 12000,
          11000, 13000, 11000, 15000, 17000, 18000,
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
      },
    ],
  };

  return (
    <div className="flex flex-col bg-white border border-gray-200 rounded-sm shadow-lg col-span-full xl:col-span-8">
      <header className="flex items-center px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">Forwarded Webhooks</h2>
      </header>
      <div className="px-5 py-1">
        <div className="flex flex-wrap items-center">
          <Stats label="Unique events" value={(52.122).toLocaleString()} />{" "}
          <div
            className="hidden w-px h-8 mx-5 bg-gray-200 md:block"
            aria-hidden="true"
          ></div>
          <Stats label="Success rate" value="89.25%" />
          <div
            className="hidden w-px h-8 mx-5 bg-gray-200 md:block"
            aria-hidden="true"
          ></div>
          <Stats label="Average Delivery time" value="525 ms" />
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow">
        {/* Change the height attribute to adjust the chart height */}
        <AreaChart data={chartData} width={800} height={300} />
      </div>
    </div>
  );
};
