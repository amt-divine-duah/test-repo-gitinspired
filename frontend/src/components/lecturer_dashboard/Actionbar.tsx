import { useRef, useState } from 'react';
import ActionButton from './ActionButton';
import Searchbar from './Searchbar';
import LecturerCreateNewAssignmentModal from './LecturerCreateNewAssignmentModal';

const Actionbar = () => {
  const [showCreateAssignmentModal, setShowCreateAssignmentModal] = useState(false);

  const handleShowCreateAssignmentModal = () => {
    setShowCreateAssignmentModal((prev) => !prev);
  };
  const [dropdown, setDropdown] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropDownRef = useRef<HTMLInputElement>(null);

  window.addEventListener('click', (e) => {
    if (e.target !== dropDownRef.current && e.target !== buttonRef.current) {
      setDropdown(false);
    }
  });

  return (
    <div className='action-bar'>
      <Searchbar />

      <div className='manipulators'>
        <div className='sort-button'>
          <div className='dropdown-toggle'>
            <ActionButton
              class={'action filter'}
              name={' sort by '}
              click={() => {
                setDropdown(!dropdown);
              }}
              reference={buttonRef}
            />
          </div>
          {dropdown && (
            <div
              className='sort'
              id='sort'
              onClick={() => {
                setDropdown(false);
              }}
              ref={dropDownRef}
            >
              <ul>
                <li id='title' value='title'>
                  Title
                </li>
                <li id='deadline' value='title'>
                  Deadline
                </li>
                <li id='updatedAt' value='title'>
                  Date
                </li>
              </ul>
            </div>
          )}
        </div>
        <ActionButton
          class={'action assign'}
          name={'assignment +'}
          click={handleShowCreateAssignmentModal}
          reference={undefined}
        />
        {showCreateAssignmentModal == true && (
          <LecturerCreateNewAssignmentModal
            handleShowAssignmentModal={handleShowCreateAssignmentModal}
          />
        )}
      </div>
    </div>
  );
};

export default Actionbar;
