import {createRoot} from 'react-dom/client';
import React from "react"
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import Home from "./Home/Home";
import Room from "./Room/Room";

const router = createBrowserRouter([
    {
        path: "/room/:id",
        element: <Room/>,
    },
    {
        path: "/",
        element: <Home/>,
    },
]);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    // <React.StrictMode>
    <RouterProvider router={router}/>
    // </React.StrictMode>
)
