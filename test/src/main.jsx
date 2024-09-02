import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Testone from "./pages/Testone/Testone.jsx";
import Testtwo from "./pages/Testtwo/Testtwo.jsx";
import Testthree from "./pages/Testthree/Testthree.jsx";
import Room from "./pages/Room/Room.jsx";
import Layout from "./Layout/Layout.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Aboutme from "./pages/Aboutme/Aboutme.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Testone />,
      },
      {
        path: "/testtwo",
        element: <Testtwo />,
      },
      {
        path: "/room",
        element: <Room />,
      },
      {
        path: "/aboutme",
        element: <Aboutme />,
      },
    ],
  },
  {
    path: "/room/testthree/:room/:datetime",
    element: <Testthree />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
