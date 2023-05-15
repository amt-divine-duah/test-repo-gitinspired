
import LecturerDashBoard from "./Pages/LecturerDashBoard"
import './App.css';
import HomePage from "./Pages/HomePage";
import LecturerView from "./Pages/Lecturer/LecturerView";
import ResetPassword from "./Pages/ResetPassword";
import MainStudentDashBoard from "./components/StudentDashBoard/MainStudentDashBoard";
import { Route, Routes } from "react-router-dom";
import AdminStudentDashBoard from "./components/AdminStudentDashBoard";
import AdminLecturerDashBoard from "./components/AdminLecturerDashBoard";
import AdminMainDashBoard from "./components/AdminMainDashBoard";
import StudentsDashBoard from "./components/StudentDashBoard/StudentsDashBoard";
import SubmissionBoard from "./components/StudentDashBoard/SubmissionBoard";
import StudentAssignmentInformation from "./components/StudentDashBoard/StudentAssignmentInformation";




const App = () => {
  return (
    <div className="app">
      <LecturerView/>
    </div>
  
  )
}

export default App