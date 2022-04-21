import React, { Component } from "react";
import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

import { Form, Button } from "semantic-ui-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function ArtFormPages() {
  const { query, push } = useRouter();

  const [newBlog, setNewBlog] = useState({
    title: "",
    image: "",
    description: "",
    categorie: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    image: "",
    description: "",
    categorie: "",
  });

  const validate = () => {
    const errors = {};

    if (!newBlog.title) errors.title = "Title is required";
    if (!newBlog.image) errors.image = "Image is required";
    if (!newBlog.description) errors.description = "Description is required";
    if (!newBlog.categorie) errors.categorie = "Categorie is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = validate();

    if (Object.keys(errors).length) return setErrors(errors);

    if (query.id) {
      await blogUpdate();
    } else {
      await createblog();
    }
    await push("/blogs");
  };

  const createblog = async () => {
    try {
      await fetch("http://localhost:3000/api/postBlog/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBlog),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const blogUpdate = async () => {
    try {
      await fetch("http://localhost:3000/api/postBlog/" + query.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBlog),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) =>
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value });

  const getBlog = async () => {
    const res = await fetch("http://localhost:3000/api/postBlog/" + query.id);
    const data = await res.json();
    setNewBlog({
      title: data.title,
      image: data.image,
      description: data.description,
      categorie: data.categorie,
    });
  };

  useEffect(() => {
    if (query.id) getBlog();
  }, []);

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      <div className="rounded-t bg-white mb-0 px-6 py-6">
        <div className="text-center flex justify-between"></div>
        <div>
          <h1 class="block w-full  text-gray-800 text-2xl font-bold mb-6">
            {query.id ? "Update Blog" : "Create Blog"}
          </h1>

          <Form onSubmit={handleSubmit}>
            <div class="mb-6">
              <label
                for="message"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                Title
              </label>
              <textarea
                id="message"
                rows="1"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="title"
                onChange={handleChange}
                error={
                  errors.title
                    ? { content: "Please enter a title", pointing: "below" }
                    : null
                }
                value={newBlog.title}
                placeholder="Enter Title ... "
              ></textarea>
            </div>
            <div class="mb-6">
              <label
                for="message"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                Image
              </label>
              <textarea
                id="message"
                rows="1"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="image"
                onChange={handleChange}
                error={
                  errors.image
                    ? { content: "Please enter image", pointing: "below" }
                    : null
                }
                value={newBlog.image}
                placeholder="Enter Image... "
              ></textarea>
            </div>
            <div class="mb-6">
              <label
                for="message"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                Description
              </label>
              <textarea
                id="message"
                rows="6"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="description"
                onChange={handleChange}
                error={
                  errors.description
                    ? { content: "Please enter content", pointing: "below" }
                    : null
                }
                value={newBlog.description}
                placeholder="Enter Description... "
              ></textarea>
            </div>
            <div class="mb-6">
              <label
                for="message"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                Categorie
              </label>
              <textarea
                id="message"
                rows="1"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="categorie"
                onChange={handleChange}
                error={
                  errors.categorie
                    ? { content: "Please enter categorie", pointing: "below" }
                    : null
                }
                value={newBlog.categorie}
                placeholder="Enter Categorie... "
              ></textarea>
            </div>
            <div className="text-center flex justify-between">
              <Button
                primary
                className="lex justify-end bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded"
              >
                {query.id ? "Update" : "Create"}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
