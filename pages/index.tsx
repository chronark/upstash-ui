import React, { useState } from "react";

import { Navigation } from "components/navigation";
import { NextPage } from "next";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { AnalyticsChart } from "components/charts/analytics";
import { LastHour } from "components/charts/lastHour";

const Analytics: NextPage = () => {
  return (
    <Navigation>
      <div className="w-full px-4 py-8 mx-auto sm:px-6 lg:px-8 max-w-9xl">
        {/* Page header */}
        <div className="mb-8 sm:flex sm:justify-between sm:items-center">
          {/* Left: Title */}
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
              Analytics
            </h1>
          </div>

          {/* Right: Actions */}
          <div className="grid justify-start grid-flow-col gap-2 sm:auto-cols-max sm:justify-end">
            {/* Datepicker built with flatpickr */}
            {/* <Datepicker align="right" /> */}
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-12 gap-6">
          <AnalyticsChart />
          <LastHour />
        </div>
      </div>
    </Navigation>
  );
};

export default withAuthenticationRequired(Analytics);
