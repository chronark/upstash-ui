import React, { useState } from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header/header";

export const Navigation: React.FC = ({ children }): JSX.Element => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
        <Header open={sidebarOpen} setOpen={setSidebarOpen} />

        <main>{children}</main>
      </div>
    </div>
  );
};
