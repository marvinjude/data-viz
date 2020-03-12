import React, { useState } from "react";
import className from "classnames";
import { Link, useLocation } from "react-router-dom";

function Navigation() {
  const paths = ["chart", "table"];
  const { pathname: activeTab } = useLocation();
  return (
    <div className="flex justify-center items-center py-5 sticky top-0 z-20">
      {/* <!-- round button --> */}
      <div className="border border-blue-800 rounded-full text-blue-800 flex capitalize bg-white">
        <Link
          to={`/${paths[0]}`}
          className={className(
            "p-2 rounded-full px-5 flex justify-center items-center focus:shadow-outline focus:outline-none transition ease-in duration-100",
            { "text-white bg-blue-800": activeTab === `/${paths[0]}` }
          )}
        >
          {paths[0]}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-activity"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </Link>
        <Link
          to={`/${paths[1]}`}
          className={className(
            "p-2 rounded-full px-5 flex justify-center items-center focus:shadow-outline focus:outline-none transition ease-in duration-100",
            { "text-white bg-blue-800": activeTab === `/${paths[1]}` }
          )}
        >
          {paths[1]}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="ml-2"
          >
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default Navigation;
