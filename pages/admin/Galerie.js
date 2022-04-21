import React from "react";
import CardGalerie from "components/Cards/CardGalerie";

// layout for page

import Admin from "layouts/Admin.js";

export default function Galerie() {
  return (
   <>
    <div className="flex flex-wrap">
        <div className="w-full lg:w-8/22 px-4">
          <CardGalerie /> 
        </div>
    </div>
   </>
  );
}

Galerie.layout = Admin;
