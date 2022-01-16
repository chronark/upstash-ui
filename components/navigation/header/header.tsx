import { useRouter } from "next/router";
import React from "react";
import Link from "next/link";
import { UserMenu } from "./user";

export type HeaderProps = {
  open: boolean;
  setOpen: (o: boolean) => void;
};

export const Header: React.FC<HeaderProps> = ({
  open,
  setOpen,
}): JSX.Element => {
  const router = useRouter();

  const path = router.asPath.split("/");
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          {/* Header: Left side */}
          <div className="flex">
            <button
              className="text-gray-500 hover:text-gray-600 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>
            <div className="text-center">
              {/* Start */}
              <ul className="flex-wrap hidden text-xs font-medium xl:text-sm lg:inline-flex">
                {path.map((segment) => {
                  const href = path
                    .slice(0, path.findIndex((s) => s === segment) + 1)
                    .join("/")
                    .replace(/\/\//g, "");
                  return (
                    <li
                      key={segment}
                      className="after:content-['/'] last:after:hidden after:text-gray-400 after:px-2 text-gray-500 last:text-primary-500"
                    >
                      <Link href={href}>
                        <a className="uppercase hover:text-primary-500">
                          {segment}
                        </a>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            {/* Hamburger button */}
          </div>

          {/* Header: Right side */}
          <div className="flex items-center space-x-3">
            {
              /* <button
              className={`w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition duration-150 rounded-full ml-3 ${searchModalOpen && 'bg-gray-200'}`}
              onClick={(e) => { e.stopPropagation(); setSearchModalOpen(true); }}
              aria-controls="search-modal"
            >
              <span className="sr-only">Search</span>
              <svg className="w-4 h-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path className="text-gray-500 fill-current" d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                <path className="text-gray-400 fill-current" d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
              </svg>
            </button> */
            }
            {/* <SearchModal id="search-modal" searchId="search" modalOpen={searchModalOpen} setModalOpen={setSearchModalOpen} /> */}
            {/* <Notifications align="right" /> */}
            {/* <Help align="right" /> */}
            {/*  Divider */}
            <hr className="w-px h-6 mx-3 bg-gray-200" />
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
};
