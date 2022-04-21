import React from "react";
import Admin from "layouts/Admin.js";
import CardListBlogs from "components/Cards/CardListBlogs";

export default function CardListBlog() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/22 px-4">
          <CardListBlogs />
        </div>
      </div>
    </>
  );
}

CardListBlog.layout = Admin;
