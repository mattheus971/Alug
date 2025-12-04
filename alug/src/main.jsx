import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router/router.jsx"; 
import { GlobalContextProvider } from "./context/GlobalContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <GlobalContextProvider>
            <RouterProvider router = {router} />
        </GlobalContextProvider>
    </React.StrictMode>
);

