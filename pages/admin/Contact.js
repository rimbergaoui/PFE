import React from "react";
import CardContact from "components/Cards/CardContact.js";

// layout for page

import Admin from "layouts/Admin.js";

export default function Contact() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/22 px-4">
          <CardContact />
        </div>
      </div>
    </>
  );
}

Contact.layout = Admin;
