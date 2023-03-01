import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";



export default function LandingPage() {
  return (
    <div >
      <h1>Video Games</h1>
      <Link to="/home">
        <button class='btn'>Enter Home</button>
      </Link>
    </div>
  );
};

//La imagen la agrego desde index.css general

