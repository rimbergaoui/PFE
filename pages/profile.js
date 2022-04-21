import React, { useEffect, useState } from "react";
import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../redux/userAction";

export default function Profile() {
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

  return (
    <>
      <Navbar transparent />
      <main className="profile-page">
        <section className="relative block h-500-px">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://cdn-tejasborja.sistemaip.net/wp-content/uploads/2016/03/HOTEL20MOVENPICK20SOUSSE20TUNISIE202-1024x683.jpg')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-16"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        alt="..."
                        src="/img/Mövenpick-Gammarth.png"
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-180-px"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center"></div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          10265
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Visitors Per Year
                        </span>
                      </div>
                      <div className="lg:mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          88
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Comments
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                    {userState && userState.name}
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
                    Europe, Afrique, Moyen-Orient, Asie
                  </div>
                  <div className="mb-2 text-blueGray-600 mt-10">
                    <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                    Chaîne hôtelière
                  </div>
                </div>
                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                        Mövenpick Hotels & Resorts est une chaîne hôtelière
                        internationale dont le siège est à Baar, en Suisse.
                        <br />
                        Le groupe exploite actuellement plus de 80
                        établissements à travers 23 pays et une vingtaine
                        d'autres sont en cours de planification ou de
                        construction.
                      </p>
                      <a
                        href="https://www.movenpick.com/fr/?merchantid=ppc-mov-mar-goo-ww-fr-sear&sourceid=bp-cen&utm_source=google&utm_medium=cpc&utm_campaign=ppc-mov-mar-goo-ww-fr-mix-sear-bp-ce&utm_term=mar&utm_content=ww-fr-ALL-Brand"
                        className="font-normal text-lightBlue-500"
                        target="_blank"
                      >
                        Show more
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
