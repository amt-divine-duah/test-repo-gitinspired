import AdminLecturerDashBoard from "../components/AdminLecturerDashBoard";
import AdminMainDashBoard from "../components/AdminMainDashBoard";
import AdminStudentDashBoard from "../components/AdminStudentDashBoard";
import NavBar from "../components/NavBar"
import '../Styles/homePage.scss'
import {Routes, Route} from 'react-router-dom';

const HomePage = () => {
  return (
    <main className="home">
      <NavBar />
      <Routes>
        <Route path="/student" element={<AdminStudentDashBoard/>}/>
        <Route path="/lecturer" element={<AdminLecturerDashBoard/>}/>
        <Route path="/admin-dashboard" element={<AdminMainDashBoard/>} />
      </Routes>
    </main>
  )
}

export default HomePage