import React from "react";
import CardAjout from "components/Cards/CardAjout";

// layout for page

import Admin from "layouts/Admin.js";

export default function Blog() {
  return (
   <>
    <div className="flex flex-wrap">
        <div className="w-full lg:w-8/22 px-4">
          <CardAjout/>
        </div>
    </div>
   </>
  );
}

Blog.layout = Admin;
