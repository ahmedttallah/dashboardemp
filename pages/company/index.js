import Link from "next/link";
import React from "react";
import { useEffect } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { baseURL } from "../../constants";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  const token = getCookie("x-access-token-admin");

  useEffect(() => {
    const loadData = async () => {}; // retrieve data from server
    loadData();
  }, []); // Load Data

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
    <Layout>
      <div className="h-screen content-center text-black">
        <div className=" mx-auto px-4 md:px-12 ">
          <div className="flex flex-wrap -mx-1 lg:-mx-4 md:my-8">
            {/* <!-- Column --> */}
            <Link href="/company/companies">
              <a className="my-4 px-4 w-full md:w-1/2 lg:my-20 lg:px-4 lg:w-1/3 ">
                {/* Card */}
                <div className="max-w-sm bg-white rounded-lg shadow-md hover:bg-blue-100">
                  <div className="px-6 py-4">
                    <div className="font-bold mb-2">Companies</div>
                  </div>
                  <div className="p-8 ">
                    Here are the Companies that Admins can verify, add, update
                    or delete them.
                  </div>
                </div>
                {/* End Card */}
              </a>
            </Link>
            {/* End Column */}

            {/* <!-- Column --> */}
            <Link href="/company/main-structure">
              <a className="my-4 px-4 w-full md:w-1/2 lg:my-20 lg:px-4 lg:w-1/3 ">
                {/* Card */}
                <div className="max-w-sm bg-white rounded-lg shadow-md hover:bg-blue-100">
                  <div className="px-6 py-4">
                    <div className="font-bold  mb-2">Main Structure</div>
                  </div>
                  <div className="p-8 ">
                    Here are the Companies main Structure where you can add,
                    update or delete them.
                  </div>
                </div>
                {/* End Card */}
              </a>
            </Link>
            {/* End Column */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
