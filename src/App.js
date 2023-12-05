import "./App.css";
import DashBoard from "./Screens/DashBoard";
import LogInScreen from "./Screens/LogInScreen";
import SignUpScreen from "./Screens/SignUpScreen";
import Profile from "./Screens/Profile";
import { createHashRouter, RouterProvider } from "react-router-dom";
import UpdateProfile from "./Screens/UpdateProfile";
import AuthorizePayment from "./Screens/AuthorizePayment";
import Deposit from "./Screens/Deposit";
import NewUser from "./Screens/NewUser";
import ChangePassword from "./Screens/ChangePassword";
const routes = createHashRouter([
  { path: "/login", element: <LogInScreen /> },
  {
    path: "/",
    element: <DashBoard />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/updateProfile",
    element: <UpdateProfile />,
  },
  {
    path: "/signup",
    element: <SignUpScreen />,
  },
  {
    path: "/authorize",
    element: <AuthorizePayment />,
  },
  {
    path: "/deposit",
    element: <Deposit />,
  },{
    path:"/newUser",
    element:<NewUser/>
  },{
    path:"/changePassword",
    element:<ChangePassword/>
  }
]);
function App() {
  return <RouterProvider router={routes} />;
}

export default App;
