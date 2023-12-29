import React from "react";
import Register from "./components/Register";
import { RouterProvider } from "react-router-dom";
import { router } from "./components/utils/routes";

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
