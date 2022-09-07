import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import axios from "axios";
import { baseURL } from "../../constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainStructure = () => {
  const router = useRouter();
  const [structures, setStructures] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [mStructId, setMStructId] = useState("");

  const submitForm = async (event) => {
    event.preventDefault();

    const formData = {
      mainStruct: event.target.structersInput.value,
    };

    await axios
      .post(`${baseURL}/company/add-main-structure`, formData)
      .then((res) => {
        toast.success(res.data.msg, {
          position: toast.POSITION.TOP_CENTER,
        });

        // Empty input Fields
        event.target.structersInput.value = "";
      })
      .then(async () => {
        const data = await axios.get(`${baseURL}/company/all-main-structure`);
        setStructures(data.data.structures);
        setShowModal(false);
      })
      .catch(function (error) {
        if (error.response) {
          toast.error(error.response.data.msg, {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.error(error.message);
        }
      });
  }; // Add Form submit button

  const submitUpdateForm = async (event) => {
    event.preventDefault();

    const formData = {
      structId: mStructId,
      newMainStruct: event.target.structersInput.value,
    };

    await axios
      .patch(`${baseURL}/company/update-main-structure`, formData)
      .then((res) => {
        toast.success(res.data.msg, {
          position: toast.POSITION.TOP_CENTER,
        });

        // Empty input Fields
        event.target.structersInput.value = "";

        // Close Update Modal
        setShowUpdateModal(false);
      })
      .then(async () => {
        const data = await axios.get(`${baseURL}/company/all-main-structure`);
        setStructures(data.data.structures);
      })
      .catch(function (error) {
        if (error.response) {
          toast.error(error.response.data.msg, {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast(error.message);
        }
      });
  }; // Update Form submit button

  const handleDelete = async (mainStruct) => {
    const formData = {
      mainStruct,
    };

    await axios
      .post(`${baseURL}/company/delete-main-structure`, formData)
      .then((res) => {
        toast.success(res.data.msg, {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .then(async () => {
        const data = await axios.get(`${baseURL}/company/all-main-structure`);
        setStructures(data.data.structures);
      })
      .catch(function (error) {
        if (error.response) {
          toast.error(error.response.data.msg, {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.error(error.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
  }; // Delete structure

  useEffect(() => {
    const loadData = async () => {
      await axios
        .get(`${baseURL}/company/all-main-structure`)
        .then((data) => {
          setStructures(data.data.structures);
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
    <div className="min-h-screen bg-cover bg-[url('/img/bg.jpg')] bg-repeat-y">
      <div className="overflow-x-auto relative sm:rounded-lg mx-2 p-8 ">
        <div className="flex justify-between items-center pb-8">
          <div>
            {/* Back Button */}
            <Link href="/company">
              <a className="mr-2 box-border relative inline-flex items-center justify-center w-auto px-4 py-2 overflow-hidden font-bold text-white transition-all duration-300 bg-indigo-600 rounded-md cursor-pointer group ring-offset-2 ring-1 ring-indigo-300 ring-offset-indigo-200 hover:ring-offset-indigo-500 ease focus:outline-none">
                <span className="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
                <span className="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
                <span className="relative z-20 flex items-center text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className=""
                  >
                    <path d="M19 12H6M12 5l-7 7 7 7" />
                  </svg>
                  Back
                </span>
              </a>
            </Link>
            {/* Endo of Back Button */}
          </div>

          {/* Search */}

          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center p-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
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
              className="block p-2 pl-10 w-40 lg:w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search Structure"
            />
          </div>
          {/* End of Search */}
        </div>
        {/* Add Button */}
        <div className="flex justify-center">
          <button
            onClick={() => setShowModal(!showModal)}
            className="flex justify-center max-w-xs px-5 py-2.5 relative rounded group font-medium text-white"
          >
            <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-purple-600 to-blue-500"></span>
            <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-purple-600 to-blue-500"></span>
            <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-purple-600 to-blue-500"></span>
            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-purple-600 from-blue-500"></span>

            <span className="relative flex items-center text-sm">
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
                className="mr-2"
              >
                <path d="M11 21H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h5l2 3h9a2 2 0 0 1 2 2v2M19 15v6M16 18h6" />
              </svg>
              Add Structure
            </span>
          </button>
        </div>

        {/* Modal */}
        <div className="flex justify-center  ">
          {showModal ? (
            <div className="mt-10 flex justify-center items-center flex-col w-1/2 rounded-lg shadow-sm h-auto p-2 min-w-min bg-opacity-40	">
              <form onSubmit={submitForm}>
                <div className="relative z-0 mb-6 w-full group">
                  <input
                    type="text"
                    name="structersInput"
                    id="structersInput"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="structersInput"
                    className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Main Structure
                  </label>
                  <p className="text-xs text-gray-400 mt-2">e.g. CEO</p>
                </div>
                <div className="flex gap-5">
                  <button className="hover:shadow-indigo-800 my-2 w-auto px-4 h-10 bg-indigo-600 text-white rounded-md shadow hover:shadow-xl font-semibold">
                    Add
                  </button>
                  <button
                    className=" w-auto px-6 my-2 border border-red-100 h-10 hover:bg-red-700 hover:text-white bg-red-200  rounded-md text-red-600  hover:shadow-lg font-semibold"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          ) : null}
        </div>
        {/* End of Modal */}
        {/* End of Add Button */}

        {/* Cards */}
        {!structures ? (
          <div className="mt-20 text-center text-gray-500 text-4xl">
            Main Structures are Empty
          </div>
        ) : (
          <div className="container my-12 mx-auto px-4 md:px-12">
            <div className="flex flex-wrap -mx-1 lg:-mx-4">
              {/* <!-- Column --> */}
              {structures.map(function (item, idx) {
                return (
                  <div
                    key={idx}
                    className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3"
                  >
                    {/* Card */}
                    <div className=" max-w-sm bg-white rounded-lg shadow-md ">
                      <div className="px-6 py-4">
                        <div className=" font-bold text-2xl ">
                          <div className="mb-4">{item.mainStruct}</div>

                          {/* CRUD Buttons */}
                          <div className="flex justify-end">
                            <button
                              onClick={() => {
                                setShowUpdateModal(!showUpdateModal);
                                setMStructId(item._id);
                              }}
                              className=" mr-2 inline-flex items-end px-4 py-2 bg-indigo-600 hover:bg-indigo-600 text-white text-sm font-medium rounded-md"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                                />
                              </svg>
                              Update
                            </button>

                            <button
                              onClick={() => {
                                handleDelete(item.mainStruct);
                              }}
                              className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 "
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                          {/* End of CRUD Buttons */}
                        </div>
                      </div>
                    </div>

                    {/* Update Modal */}
                    {mStructId == item._id ? (
                      <div className="flex justify-center  ">
                        {showUpdateModal ? (
                          <div className="mt-10 flex justify-center items-center flex-col w-1/2 rounded-lg shadow-sm h-auto p-2 min-w-min bg-opacity-40	">
                            <form onSubmit={submitUpdateForm}>
                              <div className="relative z-0 mb-6 w-full group">
                                <input
                                  type="text"
                                  name="structersInput"
                                  id="structersInput"
                                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                  placeholder=" "
                                  required
                                />
                                <label
                                  htmlFor="structersInput"
                                  className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                  New Main Structure
                                </label>
                                <p className="text-xs text-gray-400 mt-2">
                                  e.g. CEO
                                </p>
                              </div>
                              <div className="flex gap-5">
                                <button className="hover:shadow-indigo-800 my-2 w-auto px-4 h-10 bg-indigo-600 text-white rounded-md shadow hover:shadow-xl font-semibold">
                                  Update
                                </button>
                                <button
                                  className=" w-auto px-6 my-2 border border-red-100 h-10 hover:bg-red-700 hover:text-white bg-red-200  rounded-md text-red-600  hover:shadow-lg font-semibold"
                                  onClick={() => setShowUpdateModal(false)}
                                >
                                  Close
                                </button>
                              </div>
                            </form>
                          </div>
                        ) : null}
                      </div>
                    ) : (
                      ""
                    )}
                    {/* End Update Modal */}
                    {/* End Card */}
                  </div>
                );
              })}
              {/* End Column */}
            </div>
          </div>
        )}
        {/* End of cards */}

        <ToastContainer autoClose={1000} />
      </div>
    </div>
  );
};

export default MainStructure;
