import Error from "next/error";
import { useState } from "react";
import { useRouter } from "next/router";
import FooterSmall from "components/Footers/FooterSmall";
import Navbar from "components/Navbars/AuthNavbar.js";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import React from "react";
import { Confirm, Button, Loader, Grid } from "semantic-ui-react";

export default function BlogDetail({ blog, error }) {
  const [showModal, setShowModal] = React.useState(false);
  const { query, push } = useRouter();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const deleteBlog = async () => {
    const { id } = query;
    try {
      await fetch(`http://localhost:3000/api/postBlog/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = () => {
    setLoading(true);
    deleteBlog();
    close();
    push("/index2");
  };
  if (error && error.statusCode)
    return <Error statusCode={error.statusCode} title={error.statusText} />;

  return (
    <>
      <Navbar />
      <IndexNavbar fixed />
      <div className="container px-4 mx-auto flex items-center justify-center h-screen ">
        <div className="flex flex-wrap">
          <div className="w-1/3 px-4">
            <h1>{blog.title}</h1>
            <p>{blog.image}</p>
            <p>{blog.description}</p>
            <p>{blog.categorie}</p>
            <br />
            <button
              primary
              className="bg-indigo-500 text-white active:bg-indigo-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => router.push(`/${blog._id}/edit`)}
            >
              EDIT
            </button>
            <button
              secondary
              className="bg-red-500 text-white active:bg-red-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => setShowModal(true)}
            >
              DELETE
            </button>
            {showModal ? (
              <>
                <div
                  className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  <div className="relative w-auto my-6 mx-auto max-w-sm">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                        <h3 className="text-2xl font-semibold">Delete Blog</h3>
                      </div>
                      {/*body*/}
                      <div className="relative p-6 flex-auto">
                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed ">
                          Are you sure ?
                        </p>
                      </div>
                      {/*footer*/}
                      <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                        <button
                          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setShowModal(false)}
                        >
                          No
                        </button>
                        <button
                          className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setShowModal(handleDelete)}
                        >
                          Yes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </>
            ) : null}
          </div>
        </div>
      </div>

      <FooterSmall />
    </>
  );
}

export async function getServerSideProps({ query: { id } }) {
  const res = await fetch(`http://localhost:3000/api/postBlog/${id}`);

  if (res.status === 200) {
    const blog = await res.json();
    return {
      props: {
        blog,
      },
    };
  }

  return {
    props: {
      error: {
        statusCode: res.status,
        statusText: "Invalid Id",
      },
    },
  };
}
