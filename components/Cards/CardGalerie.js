import React from "react";
const cache = {};

function importAll(r) {
  r.keys().forEach((key) => (cache[key] = r(key)));
}
importAll(require.context("public/img/uploads", false, /\.(png|jpe?g|svg)$/));

const images = Object.entries(cache).map((module) => module[1].default);

const CardGalerie = () => {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Pictures</h6>
            <a
              href="/admin/Galeries"
              className="lex justify-end bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded "
            >
              Add Images
            </a>
          </div>
        </div>
        <br />
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <div class="container flex justify-center mx-auto">
            <div class="flex flex-col">
              {images.map((upload) => (
                <img style={{ width: 100, height: 100 }} src={upload} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardGalerie;
