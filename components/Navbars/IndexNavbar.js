import React from "react";
import Link from "next/link";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import cookie from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "redux/userAction";
// components

import IndexDropdown from "components/Dropdowns/IndexDropdown.js";

export default function Navbar(props) {
  const [count, setCount] = useState(1);
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const cookies = parseCookies();
  const router = useRouter();
  const [userState, setUserState] = useState("");
  const [isLoggedIn, setisLoggedIn] = useState(true);

  const { data: session } = useSession();
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.profile);
  const { loading, error, dbUser } = profile;

  const user = cookies?.user
    ? JSON.parse(cookies.user)
    : session?.user
    ? session?.user
    : "";

  console.log(userState);
  useEffect(() => {
    session ? setUserState(session.user) : setUserState(user);

    if (user) {
      dispatch(loadUser(user.email, user));
    }
  }, [router, setUserState]);
  useEffect(() => {
    if (user) {
      setisLoggedIn(true);
    }
    if (!user) {
      router.push("/src/user/login");
    }
  }, [isLoggedIn]);

  const logoutHandler = async () => {
    if (session) {
      signOut();
    }
    cookie.remove("token");
    cookie.remove("user");
    setisLoggedIn(false);
    setUserState("");
  };
  return (
    <>
      <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link href="/">
              <a
                className="text-blueGray-700 text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
                href="/"
              >
                Bienvenue
              </a>
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>

          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center">
                <a
                  className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="admin/Notification"
                  target="_blank"
                >
                  <i className="text-blueGray-400 fas fa-envelope text-lg leading-lg " />
                  <div className="position: 10px text-red-500">{count}</div>

                  <span className="lg:hidden inline-block ml-2">
                    Notification
                  </span>
                </a>
              </li>

              <Link href="/profile">
                <li className="flex items-center">
                  <a
                    className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                    target="_blank"
                  >
                    <i className="text-blueGray-400 fa fa-user-circle text-lg leading-lg " />
                    <span className="lg:hidden inline-block ml-2">Profile</span>
                  </a>
                </li>
              </Link>
              <li className="flex items-center">
                <IndexDropdown />
              </li>
              <div className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold">
                <button color="inherit" onClick={logoutHandler}>
                  <strong> LOGOUT </strong>
                </button>
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
