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
import LecturerView from "./Pages/Lecturer/LecturerView";
import StudentTab from "./Pages/Lecturer/StudentTab";
import SubmissionTab from "./Pages/Lecturer/SubmissionTab";
import DraftTab from "./Pages/Lecturer/DraftTab";
import AssignmentCardClicked from "./Pages/Lecturer/AssignmentCardClicked";
import SubmissionCardClicked from "./Pages/Lecturer/SubmissionCardClicked";
const App = () => {
  return (
    <AuthProvider authType={"localstorage"} authName={"_auth"}>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Navigate to="/auth/login" />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route
            path="/auth/claim-account/:token"
            element={<ResetPassword />}
          />
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
          <Route
            path="/lecturer/dashboard"
            element={
              <RequireAuth loginPath="/auth/login">
                <LecturerView />
              </RequireAuth>
            }
          />
          <Route
            path="/lecturer/students"
            element={
              <RequireAuth loginPath="/auth/login">
                <StudentTab />
              </RequireAuth>
            }
          />
          <Route
            path="/lecturer/submission"
            element={
              <RequireAuth loginPath="/auth/login">
                <SubmissionTab />
              </RequireAuth>
            }
          />
          <Route
            path="/lecturer/drafts"
            element={
              <RequireAuth loginPath="/auth/login">
                <DraftTab />
              </RequireAuth>
            }
          />
          <Route
            path="/lecturer/assignmentClicked"
            element={
              <RequireAuth loginPath="/auth/login">
                <AssignmentCardClicked />
              </RequireAuth>
            }
          />
          <Route
            path="/lecturer/submissionClicked"
            element={
              <RequireAuth loginPath="/auth/login">
                <SubmissionCardClicked />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
