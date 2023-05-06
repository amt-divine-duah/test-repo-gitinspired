import Dashboard from "../LecturerDashBoardComponents/Dashboard";
import Sidebar from "../LecturerDashBoardComponents/Sidebar"
import {Routes, Route} from 'react-router-dom';
import Students from "../LecturerDashBoardComponents/Students";
import Submission from "../LecturerDashBoardComponents/Submission";
import Draft from "../LecturerDashBoardComponents/Draft";
import '../Styles/lecturerDashBoard.scss'


const LecturerDashBoard = () => {
  return (
    <div className="lecturerDashBoard">
      <Sidebar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/students" element={<Students/>}/>
        <Route path="/submission" element={<Submission/>}/>
        <Route path="/draft" element={<Draft/>}/>
      </Routes>
    </div>
  )
}

export default LecturerDashBoard
