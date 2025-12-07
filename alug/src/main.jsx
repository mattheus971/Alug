import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router/router.jsx"; 
import { UsuarioContextProvider } from "./context/UsuarioContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UsuarioContextProvider>
      <RouterProvider router={router} />
    </UsuarioContextProvider>
  </React.StrictMode>
);

