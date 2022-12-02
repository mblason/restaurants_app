import React from "react";
import { Link } from "react-router-dom";
import "./ErrorScreen.css";
import errorImg from "../../assets/images/error-img.png";

export default function ErrorScreen() {
  return (
    <div
      className="ErrorScreen"
      style={{ backgroundImage: `url(${errorImg})`}}
    >
      <h2>OH DEAR!</h2>
      <p>We're really sorry, we've run into a problem here.</p>
      <Link to="/home">
        Click <span>here</span> to go back to the home page.
      </Link>
    </div>
  );
}
