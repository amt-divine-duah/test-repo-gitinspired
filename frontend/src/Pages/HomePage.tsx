import AdminLecturerDashBoard from "../components/AdminLecturerDashBoard";
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
      </Routes>
    </main>
  )
}

export default HomePage