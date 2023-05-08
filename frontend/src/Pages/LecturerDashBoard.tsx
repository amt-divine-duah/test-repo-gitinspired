import Dashboard from "../LecturerDashBoardComponents/Dashboard";
import Sidebar from "../LecturerDashBoardComponents/Sidebar"
import {Routes, Route} from 'react-router-dom';
import Students from "../LecturerDashBoardComponents/Students";
import Submission from "../LecturerDashBoardComponents/Submission";
import Draft from "../LecturerDashBoardComponents/Draft";
import '../Styles/lecturerDashBoard.scss'
import Header from "../LecturerDashBoardComponents/Header";
import AssignmentDetails from "../LecturerDashBoardComponents/AssignmentDetails";


const LecturerDashBoard = () => {
  return (
    <div className="lecturerDashBoard">
      <Sidebar />
      <div className="main-board">
      <Header/>
      <section>
      <h2>Assignment</h2>
     </section>
      <Routes>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/students" element={<Students/>}/>
        <Route path="/submission" element={<Submission/>}/>
        <Route path="/draft" element={<Draft/>}/>
        <Route path="/assignment-details" element={<AssignmentDetails/>}/>
      </Routes>
      </div>
     <h1>h</h1>
    </div>
  )
}

export default LecturerDashBoard
