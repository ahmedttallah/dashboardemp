import axios from "axios";
import { baseURL } from "../../constants";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setCookie } from "cookies-next";

const Login = () => {
  const router = useRouter();

  // Form submit button
  const submitForm = async (event) => {
    event.preventDefault();

    const formData = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    // Send request to backend to login
    await axios
      .post(`${baseURL}/admin/login`, formData)
      .then((res) => {
        toast.success(res.data.msg, {
          position: toast.POSITION.TOP_CENTER,
        });

        // Clear input Fields
        event.target.email.value = "";
        event.target.password.value = "";

        // Save Cookies
        setCookie("x-access-token-admin", res.data.token);
        setCookie("admin-id", res.data.id);
        router.push(`/`);
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

  return (
    <div className="flex h-screen justify-center items-center  bg-gradient-to-r from-sky-500 to-indigo-500">
      <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-md sm:p-8 lg:p-10">
        <h5 className="text-4xl text-gray-900  font-bold mx-8 sm:mx-15 mb-6">
          Admin Login
        </h5>

        <form onSubmit={submitForm}>
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
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
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>

          <button
            type="submit"
            className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-8 py-2.5 text-center "
          >
            Login
          </button>
        </form>
        <ToastContainer autoClose={1000} />
      </div>
    </div>
  );
};

export default Login;
