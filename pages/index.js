import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import cookie from "js-cookie";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useRouter } from "next/router";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { toast } from "react-toastify";
import { parseCookies } from "nookies";
import { loadUser } from "redux/userAction";
import { wrapper } from "redux/store";
// layout for page

import Auth from "layouts/Auth.js";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const cookies = parseCookies();

  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      toast.success("Login Success");
      router.push("/home");
      console.log("Login succcess");
    }

    if (cookies?.user) {
      router.push("/home");
    }
  }, [router, session]);

  const SubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `/api/user/login`,
        { email, password },
        config
      );

      toast.success(data.message);
      cookie.set("token", data?.token);
      cookie.set("user", JSON.stringify(data?.user));
      router.push("/home");
    } catch (error) {
      toast.error(error.response.data.error);
      let errors = [];
      errors.push({ msg: "Email is already registered" });
    }
  };
  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <br />
                  <h4 style={{ fontWeight: "bolder" }} id="title">
                    Login
                  </h4>
                </div>
                <form onSubmit={SubmitHandler}>
                  <div className="relative w-full mb-3">
                    <tr>
                      <td>
                        <i className="prefix">
                          <MdEmail />
                        </i>
                      </td>
                      <td>
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Email
                        </label>
                      </td>
                    </tr>
                    <input
                      id="email"
                      name="email"
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <tr>
                      <td>
                        <i className="prefix">
                          <RiLockPasswordFill />
                        </i>{" "}
                      </td>
                      <td>
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Password
                        </label>
                      </td>
                    </tr>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Remember me
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const session = await getSession({ req });
      const cookies = parseCookies();

      const user = cookies?.user ? JSON.parse(cookies.user) : session?.user;

      await store.dispatch(loadUser(user?.email, user));

      return {
        props: {
          session,
        },
      };
    }
);

Login.layout = Auth;
