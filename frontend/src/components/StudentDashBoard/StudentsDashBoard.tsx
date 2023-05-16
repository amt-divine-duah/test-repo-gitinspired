import StudentAssignmentInformation from "./StudentAssignmentInformation"
import AssignmenCard from './StudentAssignmentCard';
import '../../Styles/studentDashBoard.scss'
import { useState } from "react"


const StudentsDashBoard = () => {
  const [showDetails, setShowDetails]=useState(true)
  const handleShowDetails=()=>{
    setShowDetails((prev: any)=>!prev)
  }
  const colors= ['rgba(31, 170, 233, 1)', 'rgba(65, 134, 224, 1)', 'rgba(121, 111, 239, 1)', 'rgba(145, 64, 226, 1)']
    const [data]=useState([
        {
            name:'John'
        },
        {
          name:'John'
      },
      {
        name:'John'
    },
    {
      name:'Luke'
  },
    {
      name:'Luke'
  },
  {
    name:'Luke'
},
{
  name:'Isaac'
},
  
        
        
    ])
  return (
    <div className="students-dash-board-all">
       <div className="studentMainBoardContainer">
        {
            data.length===0 &&
            <div className="ifempty">
        <div>
          <img src="/Group box.svg" alt="" />
        </div>
        <p>No assignment yet. Kindly contact your lecturer</p>
      </div>
      
        }
        {
          data.length>0 && data.map((item,index)=>
          <div className='withData' key={index}>
            <AssignmenCard handleShowDetails={handleShowDetails} lecturerName={item.name} color={colors[index % colors.length]}/>
          </div>
          )
        }
      
    </div>
   { showDetails===true && <StudentAssignmentInformation showDetails={showDetails}/>}
    </div>
  )
}

export default StudentsDashBoard
