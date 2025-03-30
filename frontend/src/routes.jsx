import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./Root";
import Home from "./pages/Home";
import Students from "./pages/Students";
import StudentDetails from "./pages/StudentDetails";
import SupervisorDetails from "./pages/SupervisorDetails";
import SignupStudent from "./pages/SignupStudent"
import Supervisors from "./pages/Supervisors";
import LoginSupervisor from "./pages/LoginSupervisor";
import About from "./pages/About";
import AddGroup from "./pages/AddGroup";
import SignupSupervisor from "./pages/SignupSupervisor";
import Groups from "./pages/Groups";
import LoginStudent from "./pages/LoginStudent";
import RootAuth from "./pages/RootAuth";
import { AuthProvider } from "./components/AuthProvider";
import ContactForm from "./pages/ContactPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthProvider><RootLayout /></AuthProvider>,
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
      { path: "/groups", element: <Groups /> },
      { path: "/add-group", element: <AddGroup /> },
      { path: "/students/signup", element: <SignupStudent /> },
      { path: "/auth", element: <RootAuth /> },
      { path: "/supervisors/signup", element: <SignupSupervisor /> },
      { path: "/login/supervisor", element: <LoginSupervisor /> },
      { path: "/login/student", element: <LoginStudent /> },
      { path: "/message", element: <ContactForm /> },
      { path: "/about", element: <About /> }
    ],
  },
]);
