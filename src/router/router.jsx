import Login from "../pages/Login";
import  { createBrowserRouter } = require("react-router");
import Register from "../pages/Register";



const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login/>,
    },
    {
        path: '/register',
        element: <Register/>,
    },
])