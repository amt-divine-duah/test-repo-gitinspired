
import { PropsWithChildren, useState } from 'react'
import NavBar from '../NavBar'
import '../../Styles/MainStudentDashBoard.scss';


const MainStudentDashBoard = ({children}:PropsWithChildren) => {
    const[linkData]=useState([
       
            {
                route:"students-dashboard",
                routeName:"Dashboard"
              },
              {
                route:"submission",
                routeName:"Submission"
              }
        
        
    ])
  return (
    <div className='main-student-dashboard-container'>
     <NavBar linkData={linkData} backgroundColor={'#363143'}/>
     {children}
    </div>
  )
}

export default MainStudentDashBoard
