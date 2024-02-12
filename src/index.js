import {createRoot} from 'react-dom/client';
import React from "react"
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import Home from "./Home/Home";
import Room from "./Room/Room";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
    },
    {
        path: "/room/:id",
        element: <Room/>,
    },
]);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    // <React.StrictMode>
    <RouterProvider router={router}/>
    // </React.StrictMode>
)
