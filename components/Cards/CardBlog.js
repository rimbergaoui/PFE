import React, { Component } from "react";
import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { TagsInput } from "react-tag-input-component";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
import { Form, Button } from "semantic-ui-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function ArtFormPage({}) {
  const { query, push } = useRouter();
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [categorie, setCategorie] = useState(null);

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

  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();

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
    const form = e.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "file"
    );
    const formData = new FormData();
    for (const file of fileInput.files) {
      formData.append("file", file);
    }
    formData.append("upload_preset", "my-uploads");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dlrsygamn/image/upload",
        formData
      );

      setImageSrc(uploadRes.secure_url);
      setUploadData(uploadRes);

      console.log("data", uploadRes);
      const { url } = uploadRes.data;
      console.log("data", uploadRes.data);
      const newBlogs = {
        title,
        image: url,
        description,
        categorie,
      };
      await axios.post("http://localhost:3000/api/postBlog/", newBlogs);
      await push("/admin/Blog");
    } catch (error) {
      console.error(error);
    }

    let errors = validate();

    if (Object.keys(errors).length) return setErrors(errors);

    if (query.id) {
      await blogUpdate();
    } else {
      await createBlog();
    }
  };

  const createBlog = async () => {
    try {
      await axios.post("http://localhost:3000/api/postBlog/");
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      <div className="rounded-t bg-white mb-0 px-6 py-6">
        <div>
          <h1 class="block w-full  text-gray-800 text-2xl font-bold mb-6">
            {query.id ? "Update Article" : "Create Article"}
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
                onChange={(e) => setTitle(e.target.value)}
                error={
                  errors.title
                    ? { content: "Please enter a title", pointing: "below" }
                    : null
                }
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
              <input
                class=" fileInput mb-2 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="file"
                accept="image/*"
                name="file"
                id="message"
                onChange={(e) => setFile(e.target.files[0])}
              ></input>
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
                onChange={(e) => setDescription(e.target.value)}
                error={
                  errors.description
                    ? { content: "Please enter description", pointing: "below" }
                    : null
                }
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
                name="categorie"
                rows="1"
                onChange={(e) => setCategorie(e.target.value)}
                placeHolder="Enter Catégorie ... "
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                error={
                  errors.categorie
                    ? { content: "Please enter a categorie", pointing: "below" }
                    : null
                }
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
