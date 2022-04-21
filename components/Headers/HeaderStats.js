import React from "react";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import cookie from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "redux/userAction";

// components

export default function HeaderStats() {
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
      {/* Header */}
      <div className="relative bg-blueGray-800 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div className="flex flex-wrap"></div>
        </div>
      </div>
    </>
  );
}
