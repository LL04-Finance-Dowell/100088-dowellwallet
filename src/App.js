import "./App.css";
import DashBoard from "./Screens/DashBoard";
import LogInScreen from "./Screens/LogInScreen";
import SignUpScreen from "./Screens/SignUpScreen";
import Profile from "./Screens/Profile";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UpdateProfile from "./Screens/UpdateProfile";
import AuthorizePayment from "./Screens/AuthorizePayment";
const routes = createBrowserRouter([
  { path: "/login", element: <LogInScreen /> },
  {
    path: "/",
    element: <DashBoard />,
  },{
    path:"/profile",
    element:<Profile/>
  },{
    
    path:"/updateProfile",
    element:<UpdateProfile/>
  },
  {
    path:"/signup",
    element: <SignUpScreen />,
  },{
    path:"/authorize",
    element:<AuthorizePayment/>
  }
]);
function App() {
  return <RouterProvider router={routes} />;
}

export default App;
