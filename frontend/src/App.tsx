import { AuthProvider, RequireAuth } from 'react-auth-kit';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AdminDashBoardPage from './Pages/AdminDashBoardPage';
import ForbiddenPage from './Pages/ForbiddenPage';
import LandingPage from './Pages/LandingPage';
import ResetPassword from './Pages/Reset password/ResetPasswordPage';
import StudentDashBoardPage from './Pages/StudentDashBoardPage';
import AssignmentCardClicked from './Pages/lecturer/AssignmentCardClicked';
import DraftTab from './Pages/lecturer/DraftTab';
import StudentTab from './Pages/lecturer/StudentTab';
import SubmissionCardClicked from './Pages/lecturer/SubmissionCardClicked';
import SubmissionTab from './Pages/lecturer/SubmissionTab';
import LoginPage from './Pages/login/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLecturerDashBoard from './components/admin_dashboard_components/AdminLecturerDashBoard';
import AdminStudentDashBoard from './components/admin_dashboard_components/AdminStudentDashBoard';
import StudentAssignmentDetails from './components/students_dashboard_components/StudentAssignmentDetails';
import StudentSubmission from './components/students_dashboard_components/StudentSubmission';
import { ROLE } from './constants/roles';
import './main-styles/mainStyle.css';
import '/src/styles/combined/combined.css';
import DashboardTab from './Pages/lecturer/DashboardTab';
import { SearchProvider } from './components/lecturer_dashboard/SearchContext';
import useSearch from './hooks/useSearch';

const App = () => {
  const { search, word } = useSearch();
  return (
    <div className='app'>
      <AuthProvider authType={'localstorage'} authName={'_auth'}>
        <SearchProvider search={search} word={word}>
          <BrowserRouter>
            <ToastContainer />
            {/* AUTHENTICATION ROUTES */}
            <Routes>
              <Route path='/' element={<Navigate to='/login' />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/auth/claim-account/:token' element={<ResetPassword />} />
              <Route
                path='/landing'
                element={
                  <RequireAuth loginPath='/login'>
                    <LandingPage />
                  </RequireAuth>
                }
              />
              {/* END AUTHENTICATION ROUTES */}

              {/* ADMIN ROUTES */}
              <Route
                path='/admin/dashboard'
                element={
                  <RequireAuth loginPath='/login'>
                    <ProtectedRoute roles={[ROLE.ADMIN]}>
                      <AdminDashBoardPage />
                    </ProtectedRoute>
                  </RequireAuth>
                }
              />
              <Route
                path='/admin/student'
                element={
                  <RequireAuth loginPath='/login'>
                    <ProtectedRoute roles={[ROLE.ADMIN]}>
                      <AdminStudentDashBoard />
                    </ProtectedRoute>
                  </RequireAuth>
                }
              />
              <Route
                path='/admin/lecturer'
                element={
                  <RequireAuth loginPath='/login'>
                    <ProtectedRoute roles={[ROLE.ADMIN]}>
                      <AdminLecturerDashBoard />
                    </ProtectedRoute>
                  </RequireAuth>
                }
              />
              {/* LECTURER ROUTES */}
              <Route
                path='/lecturer/dashboard'
                element={
                  <RequireAuth loginPath='/login'>
                    <ProtectedRoute roles={[ROLE.LECTURER]}>
                      <DashboardTab />
                    </ProtectedRoute>
                  </RequireAuth>
                }
              />
              <Route
                path='/lecturer/students'
                element={
                  <RequireAuth loginPath='/login'>
                    <ProtectedRoute roles={[ROLE.LECTURER]}>
                      <StudentTab />
                    </ProtectedRoute>
                  </RequireAuth>
                }
              />
              <Route
                path='/lecturer/submission'
                element={
                  <RequireAuth loginPath='/login'>
                    <ProtectedRoute roles={[ROLE.LECTURER]}>
                      <SubmissionTab />
                    </ProtectedRoute>
                  </RequireAuth>
                }
              />
              <Route
                path='/lecturer/drafts'
                element={
                  <RequireAuth loginPath='login'>
                    <ProtectedRoute roles={[ROLE.LECTURER]}>
                      <DraftTab />
                    </ProtectedRoute>
                  </RequireAuth>
                }
              />
              <Route
                path='/lecturer/assignmentClicked'
                element={
                  <RequireAuth loginPath='/login'>
                    <AssignmentCardClicked />
                  </RequireAuth>
                }
              />
              <Route
                path='/lecturer/submissionClicked'
                element={
                  <RequireAuth loginPath='/login'>
                    <ProtectedRoute roles={[ROLE.LECTURER]}>
                      <SubmissionCardClicked />
                    </ProtectedRoute>
                  </RequireAuth>
                }
              />
              {/* END LECTURER ROUTES */}

              {/* STUDENT DASHBOARD */}
              <Route
                path='/student/dashboard'
                element={
                  <RequireAuth loginPath='/auth/login'>
                    <ProtectedRoute roles={[ROLE.STUDENT]}>
                      <StudentDashBoardPage />
                    </ProtectedRoute>
                  </RequireAuth>
                }
              >
                <Route path=':tableid' element={<StudentAssignmentDetails />}></Route>
              </Route>
              <Route path='/student/Submisssion' element={<StudentSubmission />} />

              {/* END STUDENT DASHBOARD */}

              <Route path='/forbidden' element={<ForbiddenPage />} />
              <Route path='*' element={<Navigate to='/' />} />
            </Routes>
          </BrowserRouter>
        </SearchProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
