import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage"
import ResetPassword from "./Pages/ResetPassword"
import LoginPage from "./Pages/LoginPage";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/auth/login" />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
          <Route path="/admin/dashboard" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App