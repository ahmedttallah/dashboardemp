import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../constants";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import Link from "next/link";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Dropdown } from "react-dropdown-now";
import "react-dropdown-now/style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Companies = () => {
  const router = useRouter();
  const token = getCookie("x-access-token-admin");
  const [companies, setcompanies] = useState();
  const [showModal, setShowModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [status, setStatus] = useState("Active");
  const [companyType, setCompanyType] = useState("Single");
  const [id, setId] = useState("");

  // Form submit button
  const submitForm = async (event) => {
    event.preventDefault();

    const formData = {
      tradeName: event.target.trade_name.value,
      email: event.target.email.value,
      password: event.target.password.value,
      capitalMoney: event.target.capital_money.value,
      currency: event.target.currency.value,
      status: status,
      companyType: companyType,
      phone: phoneNumber,
    };

    console.log(formData);
    if (event.target.password.value != event.target.repeat_password.value) {
      return toast.error(`Password doesn't match`, {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (!phoneNumber) {
      return toast.error(`Phone Number Can't be Empty`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    await axios
      .post(`${baseURL}/company/signup`, formData)
      .then((res) => {
        setId = res.data.id;
        toast.success(res.data.msg, {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .then(async () => {
        const data = await axios.get(`${baseURL}/company/all`);
        setcompanies(data.data.companies);
        setShowModal(false);

        // Empty input Fields
        event.target.trade_name.value = "";
        event.target.email.value = "";
        event.target.password.value = "";
        event.target.repeat_password.value = "";
        event.target.capital_money.value = "";
        event.target.currency.value = "";
        setPhoneNumber("");

        setShowModal(!showModal);
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
  };

  useEffect(() => {
    const loadData = async () => {
      await axios
        .get(`${baseURL}/company/all`, {
          headers: { "x-access-token": token },
        })
        .then((data) => {
          setcompanies(data.data.companies);
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
  }); // Load Data

  useEffect(() => {
    const isAuthenticated = async () => {
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

        <div className="flex justify-center ">
          <button
            onClick={() => setShowModal(!showModal)}
            className="flex justify-center max-w-xs px-5 py-2.5 relative rounded group font-medium text-white font-medium inline-block"
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
              <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-md sm:p-8 lg:p-10">
                <h5 className="text-xl font-black text-gray-900 pb-4">
                  Sign Up a new company to Emplopedia
                </h5>

                <form onSubmit={submitForm}>
                  <div className="relative z-0 mb-6 w-full group">
                    <input
                      type="text"
                      name="trade_name"
                      id="trade_name"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="trade_name"
                      className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Trade Name <span className="text-red-600">*</span>
                    </label>
                  </div>

                  <div className="relative z-0 mb-6 w-full group">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="email"
                      className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Email address <span className="text-red-600">*</span>
                    </label>
                  </div>
                  <div className="relative z-0 mb-6 w-full group">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                      minLength="8"
                    />
                    <label
                      htmlFor="password"
                      className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Password <span className="text-red-600">*</span>
                    </label>
                  </div>
                  <div className="relative z-0 mb-6 w-full group">
                    <input
                      type="password"
                      name="repeat_password"
                      id="repeat_password"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="repeat_password"
                      className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Confirm password <span className="text-red-600">*</span>
                    </label>
                  </div>
                  <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full group">
                      <input
                        type="text"
                        name="capital_money"
                        id="capital_money"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                      />
                      <label
                        htmlFor="capital_money"
                        className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Capital Money <span className="text-red-600">*</span>
                      </label>
                    </div>
                    <div className="relative z-0 mb-2 w-full group">
                      <input
                        type="text"
                        name="currency"
                        id="currency"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                      />
                      <label
                        htmlFor="currency"
                        className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Currency <span className="text-red-600">*</span>
                      </label>
                      <p
                        id="filled_success_help"
                        className=" text-xs text-gray-600 "
                      >
                        e.g. EGP, USD, EUR .etc
                      </p>
                    </div>
                  </div>

                  <div className="relative mb-2 w-full group">
                    <label className="font-medium  text-sm text-gray-500 ">
                      Status <span className="text-red-600">*</span>
                    </label>
                    <Dropdown
                      placeholder="Select an option"
                      name="status"
                      id="status"
                      className={
                        status == "Active"
                          ? "text-green-600 "
                          : "text-yellow-500"
                      }
                      options={[
                        "Active",
                        "Inactive Permanently",
                        "Inactive Temporarily",
                      ]}
                      value={status}
                      onChange={(status) => setStatus(status)}
                    />
                  </div>

                  <div className="relative mb-2 w-full group">
                    <label className="font-medium  text-sm text-gray-500 ">
                      Company Type <span className="text-red-600">*</span>
                    </label>
                    <Dropdown
                      name="company_type"
                      id="company_type"
                      placeholder="Select an option"
                      options={["Share", "Single", "Other"]}
                      value={companyType}
                      onChange={(companyType) => setCompanyType(companyType)}
                    />
                  </div>

                  <div className="relative z-0 mb-6  w-full group">
                    <label className="font-medium  text-sm text-gray-500 ">
                      Phone Number <span className="text-red-600">*</span>
                    </label>
                    <PhoneInput
                      required
                      name="phone"
                      id="phone"
                      country={"eg"}
                      enableSearch={true}
                      value={phoneNumber}
                      onChange={(phoneNumber) => setPhoneNumber(phoneNumber)}
                    />
                  </div>
                  
                    <button
                      className="mx-6 hover:shadow-indigo-800 my-2 w-auto px-4 h-10 bg-indigo-600 text-white rounded-md shadow hover:shadow-xl font-semibold"
                    >
                      Sign Up
                    </button>
                    <button
                      className="ml-4 w-auto px-6 my-2 border border-red-100 h-10 hover:bg-red-700 hover:text-white bg-red-200  rounded-md text-red-600  hover:shadow-lg font-semibold"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                </form>
              </div>
            </div>
          ) : null}
        </div>
        {/* End of Modal */}
        {/* End of Add Button */}

        {!companies ? (
          <div className="mt-20 text-center text-gray-500 text-4xl">
            No Companies yet
          </div>
        ) : (
          <span>
            {" "}
            <div className="flex justify-center overflow-x-auto">
              {/* Table */}
              <table className="min-w-max text-sm text-left text-gray-500 mt-20">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 ">
                  <tr>
                    <th scope="col" className="p-4"></th>
                    <th scope="col" className="py-3 px-6">
                      Trade Name
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Email
                    </th>
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
                  {companies.map(function (item, idx) {
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
                          {item.tradeName}
                        </th>

                        <th
                          scope="row"
                          className="py-4 px-4 font-medium text-gray-900 whitespace-nowrap "
                        >
                          {item.email}
                        </th>

                        <th
                          scope="row"
                          className={`py-4 px-4 font-medium text-gray-900 whitespace-nowrap ${
                            item.status == "Active"
                              ? "text-green-600"
                              : "text-yellow-600"
                          }`}
                        >
                          {item.status}
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
      <ToastContainer autoClose={1000} />
    </div>
  );
};

export default Companies;
