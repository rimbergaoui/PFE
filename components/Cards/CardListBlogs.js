import React from "react";

export default function blogs({ postBlog = [] }) {
  return (
    <>
      <div class="container flex justify-center mx-auto">
        <div class="flex flex-col">
          <div class="w-full">
            <div class="border-b border-gray-200 shadow">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    class="px-6 py-2 text-xs text-gray-500"
                    style={{ width: "30%" }}
                  >
                    Titre
                  </th>
                  <th
                    class="px-6 py-2 text-xs text-gray-500"
                    style={{ width: "30%" }}
                  >
                    Image
                  </th>
                  <th
                    class="px-6 py-2 text-xs text-gray-500"
                    style={{ width: "30%" }}
                  >
                    Description
                  </th>
                  <th
                    class="px-6 py-2 text-xs text-gray-500"
                    style={{ width: "30%" }}
                  >
                    Image
                  </th>
                  <th
                    class="px-6 py-2 text-xs text-gray-500"
                    style={{ width: "30%" }}
                  ></th>
                  <th
                    class="px-6 py-2 text-xs text-gray-500"
                    style={{ width: "30%" }}
                  ></th>
                  <th
                    class=" px-6 py-23 text-xs text-gray-500"
                    style={{ width: "30%" }}
                  ></th>
                  <th
                    class=" px-6 py-23 text-xs text-gray-500"
                    style={{ width: "30%" }}
                  ></th>
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
                    <td class="px-6 py-4">
                      <div class="text-sm text-gray-900">
                        {blog.description}
                      </div>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-500">
                      {blog.categorie}
                    </td>
                    <td class="px-6 py-4">
                      <td class="px-6 py-4"></td>
                      <td class="px-6 py-4">
                        <button
                          className="lex justify-end bg-indigo-500 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded "
                          secondary
                          onClick={() =>
                            router.push(`/postBlog/${blog._id}/edit`)
                          }
                        >
                          Edit
                        </button>{" "}
                      </td>
                      <td class="px-6 py-4">
                        <button
                          className="lex justify-end bg-red-500 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded "
                          primary
                          onClick={() => router.push(`/postBlog/${blog._id}`)}
                        >
                          Delete
                        </button>
                      </td>
                    </td>
                  </tr>
                </tbody>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/postBlog");
  const postBlog = await res.json();
  return {
    props: {
      postBlog,
    },
  };
};
