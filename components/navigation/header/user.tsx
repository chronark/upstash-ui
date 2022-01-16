import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth0 } from "@auth0/auth0-react";
import { Transition } from "@headlessui/react";


export const UserMenu: React.FC = (): JSX.Element => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { user, logout } = useAuth0();

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="relative inline-flex">
      <button
        className="inline-flex items-center justify-center group"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        {user?.picture ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="w-8 h-8 rounded-full"
            src={user.picture}
            width="32"
            height="32"
            alt="User"
          />
        ) : null}
        <div className="flex items-center truncate">
          <span className="ml-2 text-sm font-medium truncate group-hover:text-gray-800">
            {user?.nickname}
          </span>
          <svg
            className="flex-shrink-0 w-3 h-3 ml-1 text-gray-400 fill-current"
            viewBox="0 0 12 12"
          >
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div>
      </button>

      <Transition
        className="origin-top-right z-10 absolute top-full right-0 min-w-44 bg-white border border-gray-200 py-1.5 rounded shadow-lg overflow-hidden mt-1"
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterFrom="opacity-0 -translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-gray-200">
            <div className="font-medium text-gray-800">{user?.nickname}</div>
            {/* <div className="text-xs italic text-gray-500">Administrator</div> */}
          </div>
          <ul>
            <li>
              <Link href="/settings">
                <a className="flex items-center px-3 py-1 text-sm font-medium text-primary-500 hover:text-primary-600">
                  Settings
                </a>
              </Link>
            </li>
            <li>
              <button
                className="flex items-center px-3 py-1 text-sm font-medium text-primary-500 hover:text-primary-600"
                onClick={() => logout()}
              >
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  );
};
