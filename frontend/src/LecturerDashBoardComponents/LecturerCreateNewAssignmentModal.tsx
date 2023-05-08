import '../Styles/lecturerCreateAssignmentModal.scss';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import React, { useState } from 'react';

type Prop ={
    handleShowAssignmentModal:React.MouseEventHandler
}
const LecturerCreateNewAssignmentModal = ({handleShowAssignmentModal}:Prop) => {
  const [value, setValue] = useState('');
  
  return (
    <div className="create-assignment-modal-container" onClick={handleShowAssignmentModal}>
        <form className="assignment-modal" onClick={(e)=>e.stopPropagation()}>
          <header>
            <img src="" alt="" />
          </header>
          <div className="modal-content">
            <div className="modal-left-side">
              <h3>Create New Assignment</h3>
            <label htmlFor="title">Title</label>
              <div className="modal-input-container">
              <input type="text" id='title' placeholder='e.g.  Javascript' />
              <img src="" alt="" />
              </div>

              <label htmlFor="deadline">Deadline</label>
              <div className="modal-input-container">
              <input type="date" id='deadline' placeholder='dd/mm/yyyy' />
              <img src="" alt="" />
              </div>

              <p>Assignment Description</p>

              <div className="test-editor">

              <ReactQuill theme="snow" value={value} onChange={setValue} />
              </div>
              <div className="buttons">
                <button>Save and Publish</button>
                <button>Save as draft</button>
              </div>

            </div>
            <div className="modal-middle-line"></div>
            <div className="modal-right-side">

              <h3>Invite Student</h3>
              <div className="invite-student-card">
                <div className="circle">B</div>
                <div className="user-name-and-emal">
                      <label htmlFor="user">Benstrong</label>
                      <p>benstrong@amalitech.org</p>
                </div>
                <div className="user-check-box-container">
                <input type="checkbox" id='user' />
                </div>
                  
              </div>
             
            </div>
          </div>
          

        </form>
      
    </div>
  )
}

export default LecturerCreateNewAssignmentModal
