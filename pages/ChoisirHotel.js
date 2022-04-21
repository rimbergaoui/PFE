import * as React from "react";
import { useRouter } from "next/router";
// layout for page

import Hotels from "layouts/Hotels.js";

export default function ChoisirHotel() {
  const router = useRouter();
  return <p>Hello World</p>;
}

ChoisirHotel.layout = Hotels;
