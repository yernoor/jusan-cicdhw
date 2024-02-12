import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./components/pages/login";
import Registration from "./components/pages/registration";
import NotFoundPage from "./components/pages/NotFoundPage";
import Anketa from "./components/pages/Anketa";
import UploadFiles from "./components/pages/UploadFiles";
import Admin from "./components/pages/Admin";
import Developers from "./components/pages/DevelopersPage";
import Profile from "./components/pages/Profile";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="*" exact={true} element={<NotFoundPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/form" element={<Anketa />} />
        <Route path="/upload/:iin" element={<UploadFiles />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/developers" element={<Developers />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
