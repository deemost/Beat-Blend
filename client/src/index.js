import {createRoot} from 'react-dom/client';
import React from "react"
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import App from "./App";
import Home from "./Home";
import Guest, {loader as roomLoader} from "./Guest";

const router = createBrowserRouter([
    {
        path: "/room/:id",
        element: <Guest/>,
        loader: roomLoader,
    },
    {
        path: "/host",
        element: <App />,
    },
    {
        path: "/",
        element: <Home/>,
    },
]);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
)

// const container = document.getElementById('root');
// const root = createRoot(container);
// root.render(<App />);
