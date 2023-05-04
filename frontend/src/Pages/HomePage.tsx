import AdminLecturerDashBoard from "../components/AdminLecturerDashBoard";
import AdminStudentDashBoard from "../components/AdminStudentDashBoard";
import Main from "../components/Main";
import NavBar from "../components/NavBar"
import '../Styles/homePage.scss'
import {Routes, Route} from 'react-router-dom';

const HomePage = () => {
  return (
    <main className="home">
      <Main header>
      </Main>
    </main>
  )
}

export default HomePage