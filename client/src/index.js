import {createRoot} from 'react-dom/client';
import React from "react"
import {createBrowserRouter, Link, RouterProvider,} from "react-router-dom";
import App from "./App";

const router = createBrowserRouter([
    {
        path: "/guest",
        element: <div>Join room:  (enter room number)</div>,
    },
    {
        path: "/host",
        element: <App />,
    },
    {
        path: "/",
        element: <div>
            <Link to={`host`}>Host</Link>, OR <br/>
            <Link to={`guest`}>Guest</Link><br/>
        </div>,
    },
]);

// const container = document.getElementById('root');
// const root = createRoot(container);
// root.render(
//     <React.StrictMode>
//         <RouterProvider router={router}/>
//     </React.StrictMode>
// )

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
