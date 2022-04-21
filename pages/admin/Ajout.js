import React from "react";
import CardBlog from "components/Cards/CardBlog";

import Admin from "layouts/Admin.js";

export default function Ajout() {
  return (
   <>
    <div className="flex flex-wrap">
        <div className="w-full lg:w-8/22 px-4">
          <CardBlog /> 
        </div>
    </div>
   </>
  );
}

Ajout.layout = Admin;
