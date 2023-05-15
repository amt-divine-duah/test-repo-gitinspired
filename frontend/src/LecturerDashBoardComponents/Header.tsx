import { useState } from "react"
import '../Styles/LecturerBoardHeader.scss';
import LecturerCreateNewAssignmentModal from "./LecturerCreateNewAssignmentModal";

const Header = () => {
    const [showCreateAssignment ,setShowCreateAssignment]= useState(false)
    const handleModalDisplay=()=>{
        setShowCreateAssignment(prev=>!prev)
      }

      function onDraftAssignment() {
        console.log("Drafts assignment")
      }
      function onCreateAssignment() {
        console.log("published assignments")
      }
  return (
    <header>
      <div className="left-side-of-header">
        <div className="searchbox">
          <img src="/account-search.png" alt="" />
          <input type="text" placeholder="Search" />
        </div>
      </div>
      <div className="right-side-of-header">
        <button>Filter by deadline</button>
        <button onClick={handleModalDisplay}>Assignment+</button>
      </div>
      {showCreateAssignment === true && (
        <LecturerCreateNewAssignmentModal
          handleShowAssignmentModal={handleModalDisplay}
          onCreateAssignment={onCreateAssignment}
          onDraftAssignment={onDraftAssignment}
        />
      )}
    </header>
  );
}


export default Header