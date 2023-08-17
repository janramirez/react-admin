import React from "react";
import "./App.css";
import Dashboard from "./secure/Dashboard";
import Users from "./secure/Users";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./public/Login";
import Register from "./public/Register";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Dashboard />} />
          <Route path={"/users"} element={<Users />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
