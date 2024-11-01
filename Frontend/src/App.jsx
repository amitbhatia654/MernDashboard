import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Main_dashBoard from "./pages/dashboard/Main_dashBoard";
import LoginSignupPage from "./pages/LoginSignupPage";
import { ChakraProvider } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";
import Employee from "./pages/EmployeeManagement/Employee";
import CreateEmployeeData from "./pages/EmployeeManagement/CreateEmployeeData";
import PrivateRoute from "./pages/PrivateRoute";
import SignUp from "./pages/EmployeeManagement/SignUp";
import MyProfile from "./pages/MyProfile";

function App() {
  const isUserLogin = () => {
    return Boolean(localStorage.getItem("token"));
  };

  // eslint-disable-next-line react/prop-types
  const ProtectedLoginRoute = ({ children }) => {
    if (isUserLogin()) {
      return <Navigate to="/" replace></Navigate>;
    }
    return children;
  };

  return (
    <>
      <Routes>
        {" "}
        <Route
          path="/login"
          element={
            <ChakraProvider>
              <ProtectedLoginRoute>
                <LoginSignupPage />
              </ProtectedLoginRoute>
            </ChakraProvider>
          }
        ></Route>
        <Route
          path="/register"
          element={
            <ChakraProvider>
              <ProtectedLoginRoute>
                <SignUp />
              </ProtectedLoginRoute>
            </ChakraProvider>
          }
        ></Route>
        <Route path="/" element={<PrivateRoute />}>
          <Route index element={<Main_dashBoard></Main_dashBoard>}></Route>
          <Route path="employees" element={<Employee />}></Route>
          <Route path="profile" element={<MyProfile></MyProfile>}></Route>
          <Route
            path="/add-new-employee"
            element={<CreateEmployeeData />}
          ></Route>
          <Route path="customers" element={<h2>Emloyees Data</h2>}></Route>
          <Route path="orders" element={<h2>Order Data</h2>}></Route>
        </Route>
        <Route
          path="/*"
          element={<h3> Something Went Wrong or No Route Found</h3>}
        ></Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
