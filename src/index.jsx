 import React from "react";
 import ReactDOM from "react-dom/client";
 import Login from "./layout/authentication/LoginForm"; 
 import "./index.css";
 import {BrowserRouter as Router} from "react-router-dom"; 
 import reportWebVitals from "./reportWebVitals";

 const root = ReactDOM.createRoot(document.getElementById("root"));
 root.render(
  <React.StrictMode>
    <Router>
      <div>
        <img src="background.svg" className="z-0 absolute bg-cover"/>
        <Login />
      </div>
    </Router>
  </React.StrictMode>
 );
 reportWebVitals();
