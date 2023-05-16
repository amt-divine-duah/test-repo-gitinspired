
import LecturerDashBoard from "./Pages/LecturerDashBoard"
import './App.css';
import HomePage from "./Pages/HomePage";
import LecturerView from "./Pages/Lecturer/LecturerView";
import ResetPassword from "./Pages/ResetPassword";
import MainStudentDashBoard from "./Pages/MainStudentDashBoardPage";
import { Route, Routes } from "react-router-dom";
import AdminStudentDashBoard from "./components/AdminStudentDashBoard";
import AdminLecturerDashBoard from "./components/AdminLecturerDashBoard";
import AdminMainDashBoard from "./components/AdminMainDashBoard";
import StudentsDashBoard from "./components/StudentDashBoard/StudentsDashBoard";
import SubmissionBoard from "./components/StudentDashBoard/SubmissionBoard";
import StudentAssignmentInformation from "./components/StudentDashBoard/StudentAssignmentInformation";
import LoginPage from "./Pages/LoginPage";




const App = () => {
  return (
    <div className="app">
      {/* <HomePage>
      <Routes>
        <Route path="/student" element={<AdminStudentDashBoard/>}/>
        <Route path="/lecturer" element={<AdminLecturerDashBoard/>}/>
        <Route path="/" element={<AdminMainDashBoard/>} />
      </Routes>
      </HomePage> */}
      <MainStudentDashBoard>
        <Routes>
          <Route path="students-dashboard" element={<StudentsDashBoard/>}/>
          <Route path="submission" element={<SubmissionBoard/>}/>
        </Routes>
      </MainStudentDashBoard>
     
      {/* <LoginPage/> */}
    </div>
  
  )
}

export default App