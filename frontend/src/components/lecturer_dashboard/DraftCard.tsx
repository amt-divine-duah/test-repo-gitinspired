import { DraftCardType } from './LecturerCustomTypes';
import parse from "html-react-parser";
import LecturerEditAssignmentModal from './LecturerEditAssignmentModal';
import { useState } from 'react';


const DraftCard = (prop: DraftCardType) => {
  const [showEditAssignmentModal, setShowEditAsssignmentModal] =useState(false)
  const handleShowEditModal =()=>{
  setShowEditAsssignmentModal((prev)=>!prev)

  }
  return (
    <div className='draft-card'>
    <div className='draft-title'>
      <p>{prop.title}</p>
    </div>

    <div className='draft-description'>
      <div className='details'>
        <p>   {prop.description.length > 70
            ? parse(prop.description?.slice(0, 70) + '...')
            : parse(prop.description)}</p>
      </div>

      <div className='draft-features'>
        <div className='draft-feature-top'>
          <p>{new Date(prop.date).toDateString().slice(0,10)}</p>
          <img src='/edit.png' alt='edit button' onClick={handleShowEditModal}/>
        </div>
        <div className='draft-feature-bottom'>
          <p>{prop.studentNumber} students invited</p>
        </div>
      </div>
    </div>
    {showEditAssignmentModal && <LecturerEditAssignmentModal  handleShowAssignmentModal={handleShowEditModal} Title='Edit Assignment' id={prop.id}/>}
  </div>
  )
}

export default DraftCard