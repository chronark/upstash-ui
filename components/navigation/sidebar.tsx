import { useRouter } from "next/router";
import React from "react";
import { Layers, Settings } from "react-feather";
import { Activity } from "react-feather";
import Link from "next/link";

type NavbarLinkProps = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const NavbarLink: React.FC<NavbarLinkProps> = ({
  href,
  label,
  icon,
}): JSX.Element => {
  const router = useRouter();
  return (
    <li
      className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
        router.pathname === href && "bg-gray-900"
      }`}
    >
      <Link href={href}>
        <a
          className={`block text-gray-200 hover:text-white truncate transition duration-150 ${
            router.pathname === "/" && "hover:text-gray-200"
          }`}
        >
          <div className="flex items-center">
            <div className="w-6 h-6 shrink-0">{icon}</div>
            <span className="ml-3 text-sm font-medium duration-200 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
              {label}
            </span>
          </div>
        </a>
      </Link>
    </li>
  );
};

export type SideparProps = { open: boolean; setOpen: (o: boolean) => void };

export const Sidebar: React.FC<SideparProps> = ({
  open,
  setOpen,
}): JSX.Element => {
  console.log({ open });
  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-gray-800 p-4 transition-all duration-200 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between pr-3 mb-10 sm:px-2">
          {/* Close button */}
          <button
            className="text-gray-500 lg:hidden hover:text-gray-400"
            onClick={() => setOpen(!open)}
            aria-controls="sidebar"
            aria-expanded={open}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
        </div>

        <div className="space-y-8">
          <div>
            <ul className="mt-3">
              <NavbarLink href="/cluster" label="Cluster" icon={<Layers />} />
              <NavbarLink
                href="/settings"
                label="Settings"
                icon={<Settings />}
              />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
