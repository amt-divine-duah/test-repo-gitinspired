import StudentAssignmentInformation from "./StudentAssignmentInformation"
import StudentsMainBoard from "./StudentsMainBoard"
import '../../Styles/studentDashBoard.scss'
import { useState } from "react"


const StudentsDashBoard = () => {
  const [showDetails, setShowDetails]=useState(true)
  return (
    <div className="students-dash-board-all">
    <StudentsMainBoard setShowDetails={setShowDetails}/>
   { showDetails===true && <StudentAssignmentInformation/>}
    </div>
  )
}

export default StudentsDashBoard
