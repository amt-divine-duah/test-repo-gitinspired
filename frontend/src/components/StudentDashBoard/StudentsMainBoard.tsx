import { useState } from 'react';
import '../../Styles/StudentMainBoard.scss'
import AssignmenCard from './AssignmenCard';

const StudentsMainBoard = ({setShowDetails}:any) => {
  const handleShowDetails=()=>{
    setShowDetails((prev: any)=>!prev)
  }

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
      name:'John'
  },
        
        
    ])
  return (
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
          data.length>0 && data.map((item)=>
          <div className='withData'>
            <AssignmenCard handleShowDetails={handleShowDetails} lecturerName={item.name}/>
          </div>
          )
        }
      
    </div>
  );
};

export default StudentsMainBoard;
