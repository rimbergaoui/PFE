import Navbar from "components/Navbars/AuthNavbar.js";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import FooterSmall from "components/Footers/FooterSmall";
import React from "react";
import { useRouter } from "next/router";
import Pagination from "../components/Pagination";

export default function blogs({ postBlog = [] }) {
  const router = useRouter();
  if (postBlog.length === 0)
    return (
      <>
        <Navbar />
        <IndexNavbar fixed />
        <div
          centered
          verticalAlign="middle"
          columns="1"
          style={{ heigth: "80vh" }}
        >
          <Navbar />
          <IndexNavbar fixed />
          <div class="flex flex-wrap justify-center">
            <div class="w-6/12 sm:w-4/12 px-4">
              <div>
                <div class="text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-500">
                  <span class="text-xl inline-block mr-5 align-middle">
                    <i class="fas fa-bell" />
                  </span>
                  <span class="inline-block align-middle mr-8">
                    <b class="capitalize"></b> There are no Blog - add a blog!
                  </span>
                </div>

                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRqQ8HYHnqyPVQaT2dv_3vNqu7tQ4VTRAr2A&usqp=CAU"
                  alt="..."
                  class="shadow rounded max-w-full h-auto align-middle border-none"
                />
                <br />
                <a
                  href="/admin/Ajout"
                  className="bg-blueGray-800 text-white active:bg-blueGray-800 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                >
                  Create a Blog
                </a>
              </div>
            </div>
          </div>
        </div>
      </>
    );

  return (
    <>
      <Navbar />
      <IndexNavbar fixed />

      <div style={{ padding: "100px" }}>
        <div class="container flex justify-center mx-auto">
          <div class="flex flex-col">
            <div className="relative flex w-full flex-wrap items-stretch">
              <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                placeholder="Search here..."
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
              />
            </div>
            <div class="w-full">
              <div class="border-b border-gray-200 shadow">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      class="px-6 py-2 text-xs text-gray-500"
                      style={{ width: "30%" }}
                    >
                      <strong>Titre</strong>
                    </th>
                    <th
                      class="px-6 py-2 text-xs text-gray-500"
                      style={{ width: "30%" }}
                    >
                      <strong>Image</strong>
                    </th>
                    <th
                      class="px-6 py-2 text-xs text-gray-500"
                      style={{ width: "30%" }}
                    >
                      <strong>Description</strong>
                    </th>
                    <th
                      class="px-6 py-2 text-xs text-gray-500"
                      style={{ width: "30%" }}
                    >
                      <strong>Catégorie</strong>
                    </th>
                  </tr>
                </thead>
                {postBlog.map((blog) => (
                  <tbody class="bg-white divide-y divide-gray-300">
                    <tr class="whitespace-nowrap">
                      <td class="px-6 py-4 text-sm text-gray-500">
                        {blog.title}
                      </td>
                      <td class="px-6 py-4 text-sm text-gray-500">
                        {blog.image}
                      </td>
                      <td class="px-6 py-4 text-sm text-gray-500">
                        {blog.description}
                      </td>
                      <td class="px-6 py-4 text-sm text-gray-500">
                        {blog.categorie}
                      </td>
                      <div class="max-w-sm w-full lg:max-w-full lg:flex">
                        <button
                          primary
                          className="bg-blueGray-800 text-white active:bg-blueGray-800 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => router.push(`/${blog._id}`)}
                        >
                          VIEW
                        </button>
                        <button
                          secondary
                          className="bg-indigo-500 text-white active:bg-indigo-700 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          onClick={() => router.push(`/${blog._id}/edit`)}
                        >
                          EDIT
                        </button>{" "}
                        <button
                          secondary
                          className="bg-red-500 text-white active:bg-red-700 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          onClick={() => router.push(`/${blog._id}/delete`)}
                        >
                          DELETE
                        </button>
                      </div>
                    </tr>
                  </tbody>
                ))}
              </div>
            </div>
          </div>
        </div>
        <br />
        <div class="flex flex-col items-center">
          <Pagination />
        </div>
      </div>
      <FooterSmall />
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  const res = await fetch("http://localhost:3000/api/postBlog");
  const postBlog = await res.json();

  return {
    props: {
      postBlog,
    },
  };
};
