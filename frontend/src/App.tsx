
import LecturerDashBoard from "./Pages/LecturerDashBoard"
import './App.css';
import HomePage from "./Pages/HomePage";
import LecturerView from "./Pages/Lecturer/LecturerView";
import ResetPassword from "./Pages/ResetPassword";




const App = () => {
  return (
    <div className="app">
      {/* { <LecturerDashBoard/> } */}
     
      <LecturerView/>
      
    </div>
  
  )
}

export default App