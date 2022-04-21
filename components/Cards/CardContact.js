import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
// components

export default function CardContact() {
  const [count, setCount] = useState(0);
  const [newContact, setNewContact] = useState({
    username: "",
    email: "",
    Questions: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    Questions: "",
  });

  const { query, push } = useRouter();

  const validate = () => {
    const errors = {};

    if (!newContact.username) errors.username = "Username is required";
    if (!newContact.email) errors.email = "Email is required";
    if (!newContact.Questions) errors.Questions = "Questions is required";

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = validate();

    if (Object.keys(errors).length) return setErrors(errors);

    if (query.id) {
      await updateContact();
    } else {
      await createContact();
    }

    await push("/admin/Contact");
  };

  const createContact = async () => {
    try {
      await fetch("http://localhost:3000/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newContact),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const updateContact = async () => {
    try {
      await fetch("http://localhost:3000/api/contacts" + query.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newContact),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) =>
    setNewContact({ ...newContact, [e.target.name]: e.target.value });

  const getContact = async () => {
    const res = await fetch("http://localhost:3000/api/contacts" + query.id);
    const data = await res.json();
    setNewContact({
      username: data.username,
      email: data.email,
      Questions: data.Questions,
    });
  };

  useEffect(() => {
    if (query.id) getContact();
  }, []);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Contact US</h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form onSubmit={handleSubmit}>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              {query.id ? "Update" : "User Information"}
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Username
                  </label>
                  <input
                    required
                    label="username"
                    placeholder="username"
                    name="username"
                    onChange={handleChange}
                    error={
                      errors.username
                        ? {
                            content: "Please enter a username",
                            pointing: "below",
                          }
                        : null
                    }
                    value={newContact.username}
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue=""
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Email
                  </label>
                  <input
                    required
                    label="email"
                    placeholder="email"
                    name="email"
                    onChange={handleChange}
                    error={
                      errors.email
                        ? {
                            content: "Please enter an email",
                            pointing: "below",
                          }
                        : null
                    }
                    value={newContact.email}
                    type="email"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue=""
                  />
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />

            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Questions
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Any Questions ?
                  </label>
                  <input
                    required
                    label="Questions"
                    placeholder="Questions"
                    name="Questions"
                    onChange={handleChange}
                    error={
                      errors.Questions
                        ? {
                            content: "Please enter a question",
                            pointing: "below",
                          }
                        : null
                    }
                    value={newContact.Questions}
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    rows="4"
                    defaultValue=""
                    input
                  />
                </div>
                <div className="max-w-sm w-full lg:max-w-full lg:flex">
                  <a
                    primary
                    href="/admin/Contact"
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  >
                    Cancel
                  </a>
                  <button
                    secondary
                    onClick={() => setCount(count + 1)}
                    className="bg-blueGray-800 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  >
                    {query.id ? "Update" : "send"}
                  </button>
                  {count}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
