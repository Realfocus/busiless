import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./Root";
import Home from "./pages/Home";
import Students from "./pages/Students";
import StudentDetails from "./pages/StudentDetails";
import SupervisorDetails from "./pages/SupervisorDetails";
import Supervisors from "./pages/Supervisors";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import About from "./pages/About";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      { path: "/supervisors", element: <Supervisors /> },
      {
        path: "/students",
        element: <Students />,
      },
      {
        path: "/students/:id",
        element: <StudentDetails />,
      },
      {
        path: "/supervisors/:id",
        element: <SupervisorDetails />,
      },
      { path: "/signup", element: <Signup /> },
      { path: "/login", element: <Login /> },
      {path:"/about",element:<About/>}
    ],
  },
]);
