import React from "react";
import {useState} from 'react'; 
import Admin from "layouts/Admin.js";

export default function Galeries() {
    const [image, setImage] = useState(null);
    const [createObjectURL, setCreateObjectURL] = useState(null);
  
    const uploadToClient = (event) => {
      if (event.target.files && event.target.files[0]) {
        const i = event.target.files[0];
  
        setImage(i);
        setCreateObjectURL(URL.createObjectURL(i));
      }
    };
  
    const uploadToServer = async (event) => {        
      const body = new FormData();
      // console.log("file", image)
      body.append("file", image);    
      const response = await fetch("/api/upload", {
        method: "POST",
        body
      });
    };
  
  return (
   <>
   <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
   <div className="rounded-t bg-white mb-0 px-6 py-6">
   <div className="text-center flex justify-between">
       <a href="/admin/Galerie">
           Previous
       </a>
   <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form method="POST" encType="multipart/form-data">
            <div class="flex justify-center mt-8">
              <div class="rounded-lg lg:w-1/2">
                <div class="m-4">
                  <label class="inline-block mb-2 text-gray-500">
                    Upload Image
                  </label>
                  <div class="flex items-center justify-center w-full">
                    <label class="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                      <div class="flex flex-col items-center justify-center pt-7">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <p class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                          Select a photo
                        </p>
                      </div>
                      <input
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 "
                        type="file"
                        name="image"
                        id="myImage"
                        onChange={uploadToClient}
                      ></input>
                    </label>
                  </div>
                </div>
                <div class="flex p-2 space-x-4">
                  <button class="px-4 py-2 text-white bg-red-500 rounded shadow-xl">
                    Cancel
                  </button>
                  <button
                    class="px-4 py-2 text-white bg-emerald-500 rounded shadow-xl"
                    type="submit"
                    onClick={uploadToServer}
                  >
                    Upload 
                  </button>
                </div>
              </div>
            </div>
          </form>
          <img src={createObjectURL} />
        </div>
    </div>
    </div>
    </div>
   </>
  );
}

Galeries.layout = Admin;
