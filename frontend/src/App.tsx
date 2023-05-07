import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./Pages/HomePage";
import ResetPassword from "./Pages/ResetPassword";
import LoginPage from "./Pages/LoginPage";
import { AuthProvider, RequireAuth } from "react-auth-kit";
import LandingPage from "./Pages/LandingPage";
import AdminStudentDashBoard from "./components/AdminStudentDashBoard";
import AdminLecturerDashBoard from "./components/AdminLecturerDashBoard";
const App = () => {
  return (
      <AuthProvider authType={"localstorage"} authName={"_auth"}>
        <BrowserRouter>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Navigate to="/auth/login" />} />
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/claim-account/:token" element={<ResetPassword />} />
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
            <Route
              path="/admin/student"
              element={
                <RequireAuth loginPath="/auth/login">
                  <AdminStudentDashBoard />
                </RequireAuth>
              }
            />
            <Route
              path="/admin/lecturer"
              element={
                <RequireAuth loginPath="/auth/login">
                  <AdminLecturerDashBoard />
                </RequireAuth>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
  );
};

export default App;
