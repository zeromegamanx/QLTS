import React from "react";
import ReactDOM from "react-dom/client";
import Login from "./LoginForm"; 
import "./index.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="flex justify-center items-center h-screen w-screen">
      <img src="background.svg" className="z-0 absolute bg-cover"/>
      <Login  />
    </div>
  </React.StrictMode>
);