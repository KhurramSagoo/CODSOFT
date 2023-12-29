import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import React from "react";
import Home from "../components/Home";

export const ROOT = "/";
export const LOGIN = "/login";
export const REGISTER = "/register";
export const PROTECTED = "/protected";
export const DASHBOARD = "/protected/dashboard";

export const router = createBrowserRouter([
  { path: ROOT, element: <Home /> },
  { path: LOGIN, element: <Login /> },
  { path: REGISTER, element: <Register /> },
]);
