import React from "react";
import { Copyright } from "lucide-react";

function Footer() {
  return (
    <div className="py-3" style={{backgroundColor: "#E5E7EB"}}>
      <div className="container px-lg-5 px-sm-0 d-flex justify-content-center">
        <Copyright />
        <p className="m-0 mx-1 text-center">
          2024 | whispr, a project by Nikki Lionel Ocer 🩵.
        </p>
      </div>
    </div>
  );
}

export default Footer;
