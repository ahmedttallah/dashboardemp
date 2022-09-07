import React from "react";
import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../constants";
import { getCookie } from "cookies-next";

const Admins = () => {
  const [admins, setAdmins] = useState();

  useEffect(() => {
    const loadData = async () => {
      await axios
        .get(`${baseURL}/admin/all`)
        .then((data) => {
          setAdmins(data.data.admins);
        })
        .catch((err) => {
          if (err.response.data)
            toast.error(err.response.data.msg, {
              position: toast.POSITION.TOP_CENTER,
            });
          else
            toast.error("Internal Server ERROR", {
              position: toast.POSITION.TOP_CENTER,
            });
        });
    };
    loadData();
  }, []); // Load Data

  useEffect(() => {
    const isAuthenticated = async () => {
      const token = getCookie("x-access-token-admin");
      await axios
        .get(`${baseURL}/verify-token`, {
          headers: { "x-access-token": token },
        })
        .catch(function (error) {
          if (error.response) {
            router.push("/auth/login");
          } else
            toast.error("Internal Server ERROR", {
              position: toast.POSITION.TOP_CENTER,
            });
        });
    }; // checks if the user is authenticated
    isAuthenticated();
  }); // Ensure Auth

  return (
    <Layout>
      <div className="overflow-x-auto relative sm:rounded-lg p-10 ">
        <div className="flex justify-between items-center pb-8">
          {/* Search */}

          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 "
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              className="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
              placeholder="Search for an admin"
            />
          </div>
          {/* End of Search */}

          {/* Add Button */}
          <div className="flex justify-center ">
            <a
              href="#"
              className="flex justify-center max-w-xs px-5 py-2.5 relative rounded group font-medium text-white font-medium inline-block"
            >
              <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-purple-600 to-blue-500"></span>
              <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-purple-600 to-blue-500"></span>
              <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-purple-600 to-blue-500"></span>
              <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-purple-600 from-blue-500"></span>

              <span className="relative z-20 flex items-center text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11 21H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h5l2 3h9a2 2 0 0 1 2 2v2M19 15v6M16 18h6" />
                </svg>
                <span className="hidden lg:block ml-2">Add Admin</span>
              </span>
            </a>
          </div>

          {/* End of Add Button */}
        </div>

        {!admins ? (
          <div className="mt-20 text-center text-gray-500 text-4xl">
            No Admins yet
          </div>
        ) : (
          <span>
            {" "}
            <div className="flex justify-center">
              {/* Table */}
              <table className="min-w-max text-sm text-left text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 ">
                  <tr>
                    <th scope="col" className="p-4"></th>
                    <th scope="col" className="py-3 px-6">
                      Email
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Action
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {admins.map(function (item, idx) {
                    return (
                      <tr
                        key={idx}
                        className="bg-white border-b  hover:bg-gray-50 "
                      >
                        <td className="p-4 w-4"></td>
                        <th
                          scope="row"
                          className="py-4 px-4 font-medium text-gray-900 whitespace-nowrap "
                        >
                          {item.email}
                        </th>

                        <td className="py-4 px-6">
                          <a
                            href="#"
                            className="font-medium text-blue-600 hover:underline"
                          >
                            Edit
                          </a>
                        </td>

                        <td className="py-4 px-6">
                          <a
                            href="#"
                            className="font-medium text-red-600  hover:underline"
                          >
                            Delete
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {/* End of Table */}
            {/* Pagination */}
            <nav
              className="flex justify-center items-center pt-8 "
              aria-label="Table navigation"
            >
              <span className="mr-8 text-sm font-normal text-gray-500 ">
                Showing{" "}
                <span className="font-semibold text-gray-900 ">1-10</span> of{" "}
                <span className="font-semibold text-gray-900">1000</span>
              </span>
              <ul className="inline-flex items-center -space-x-px">
                <li>
                  <a
                    href="#"
                    className="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                  >
                    <span className="sr-only">Previous</span>
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                  >
                    1
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                  >
                    2
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    aria-current="page"
                    className="z-10 py-2 px-3 leading-tight text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700"
                  >
                    3
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                  >
                    ...
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                  >
                    100
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                  >
                    <span className="sr-only">Next</span>
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                </li>
              </ul>
            </nav>
            {/* End of Pagination */}
          </span>
        )}
      </div>
    </Layout>
  );
};

export default Admins;
