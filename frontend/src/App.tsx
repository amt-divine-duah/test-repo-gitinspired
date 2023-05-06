import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./Pages/HomePage";
import ResetPassword from "./Pages/ResetPassword";
import LoginPage from "./Pages/LoginPage";
import { AuthProvider, RequireAuth } from "react-auth-kit";
import LandingPage from "./Pages/LandingPage";

const App = () => {
  return (
      <AuthProvider authType={"localstorage"} authName={"_auth"}>
        <BrowserRouter>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Navigate to="/auth/login" />} />
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/reset-password" element={<ResetPassword />} />
            <Route
              path="/landing"
              element={
                <RequireAuth loginPath="/auth/login">
                  <LandingPage />
                </RequireAuth>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <RequireAuth loginPath="/auth/login">
                  <HomePage />
                </RequireAuth>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
  );
};

export default App;
