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
import ProtectedRoute from "./components/ProtectedRoute";
import { ROLE } from "./constants/roles";
import ForbiddenPage from "./Pages/ForbiddenPage";
import AdminMainDashBoard from "./components/AdminMainDashBoard";
const App = () => {
  return (
    <AuthProvider authType={"localstorage"} authName={"_auth"}>
      <BrowserRouter>
        <ToastContainer />
        {/* AUTHENTICATION ROUTES */}
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
          {/* END AUTHENTICATION ROUTES */}

          {/* ADMIN ROUTES */}
          <Route
            path="/admin/dashboard"
            element={
              <RequireAuth loginPath="/auth/login">
                <ProtectedRoute roles={[ROLE.ADMIN]}>
                  <AdminMainDashBoard />
                </ProtectedRoute>
              </RequireAuth>
            }
          />
          <Route
            path="/admin/student"
            element={
              <RequireAuth loginPath="/auth/login">
                <ProtectedRoute roles={[ROLE.ADMIN]}>
                  <AdminStudentDashBoard />
                </ProtectedRoute>
              </RequireAuth>
            }
          />
          <Route
            path="/admin/lecturer"
            element={
              <RequireAuth loginPath="/auth/login">
                <ProtectedRoute roles={[ROLE.ADMIN]}>
                  <AdminLecturerDashBoard />
                </ProtectedRoute>
              </RequireAuth>
            }
          />
          {/* END ADMIN ROUTES */}

          {/* LECTURER ROUTES */}
          <Route
            path="/lecturer/dashboard"
            element={
              <RequireAuth loginPath="/auth/login">
                <ProtectedRoute roles={[ROLE.LECTURER]}>
                  <LecturerView />
                </ProtectedRoute>
              </RequireAuth>
            }
          />
          <Route
            path="/lecturer/students"
            element={
              <RequireAuth loginPath="/auth/login">
                <ProtectedRoute roles={[ROLE.LECTURER]}>
                  <StudentTab />
                </ProtectedRoute>
              </RequireAuth>
            }
          />
          <Route
            path="/lecturer/submission"
            element={
              <RequireAuth loginPath="/auth/login">
                <ProtectedRoute roles={[ROLE.LECTURER]}>
                  <SubmissionTab />
                </ProtectedRoute>
              </RequireAuth>
            }
          />
          <Route
            path="/lecturer/drafts"
            element={
              <RequireAuth loginPath="/auth/login">
                <ProtectedRoute roles={[ROLE.LECTURER]}>
                  <DraftTab />
                </ProtectedRoute>
              </RequireAuth>
            }
          />
          <Route
            path="/lecturer/assignmentClicked"
            element={
              <RequireAuth loginPath="/auth/login">
                <ProtectedRoute roles={[ROLE.LECTURER]}>
                  <AssignmentCardClicked />
                </ProtectedRoute>
              </RequireAuth>
            }
          />
          <Route
            path="/lecturer/submissionClicked"
            element={
              <RequireAuth loginPath="/auth/login">
                <ProtectedRoute roles={[ROLE.LECTURER]}>
                  <SubmissionCardClicked />
                </ProtectedRoute>
              </RequireAuth>
            }
          />
          {/* END LECTURER ROUTES */}

          <Route path="/forbidden" element={<ForbiddenPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
