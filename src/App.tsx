import React from "react";
import "./App.css";
import Dashboard from "./secure/dashboard/Dashboard";
import Users from "./secure/users/Users";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./public/Login";
import Register from "./public/Register";
import RedirectToDashboard from "./secure/RedirectToDashboard";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<RedirectToDashboard />} />
          <Route path={"/dashboard"} element={<Dashboard />} />
          <Route path={"/users"} element={<Users />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
