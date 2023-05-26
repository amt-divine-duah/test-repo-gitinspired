import { useEffect, useRef, useState } from 'react';
import { useAuthUser } from 'react-auth-kit';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { UserInterface } from '../../customTypesAndInterface/AdminCustomTypes';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector';
import { publishAssignment } from '../../store/features/LecturerPublishAssignmentSlice';
import { fetchLecturersStudent } from '../../store/features/LecturersStudentDataSlice';
import { ShowMoadalType } from './LecturerCustomTypes';
import LecturerInviteStudentCard from './LecturerInviteStudentCard';

const LecturerCreateNewAssignmentModal = ({ handleShowAssignmentModal }: ShowMoadalType) => {
  const [description, setDescription] = useState('');
  const [users, setUsers] = useState<UserInterface[] | null>();
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const titleRef = useRef<HTMLInputElement>(null);
  const deadlineRef = useRef<HTMLInputElement>(null);
  const auth = useAuthUser();

  const descriptionValue = description;
  const title = titleRef.current ?.value ??'';
  const deadline = deadlineRef.current ?.value ??'';

  const formData = {
    title: title,
    description: descriptionValue,
    course: title,
    deadline: deadline,
    createdBy: auth()?.loginId,
    publish: true,
    students: selectedUsers,
  };

  const editorStyle = {
    height: '7rem',
  };

  const dispatch = useAppDispatch();
  const { student } = useAppSelector((state) => state.lecturersStudentData);

  useEffect(() => {
    dispatch(fetchLecturersStudent());
    setUsers(student);
  }, [student?.length]);

  const handlePublishSubmit = async (event: React.MouseEvent) => {
    event.preventDefault();
    dispatch(publishAssignment(formData));
  };

  const handleDraftSubmit = async (event: React.MouseEvent) => {
    event.preventDefault();
    const formData = {
      title: title,
      description: descriptionValue,
      course: title,
      deadline: deadline,
      createdBy: auth()?.loginId,
      publish: false,
      students: selectedUsers,
    };
    dispatch(publishAssignment(formData));
  };

  const handleContentChange = (value: string) => {
    setDescription(value);
  };

  return (
    <div className='create-assignment-modal-container' onClick={handleShowAssignmentModal}>
      <form className='assignment-modal' onClick={(e) => e.stopPropagation()}>
        <header>
          <img src='' alt='' />
        </header>
        <div className='modal-content'>
          <div className='modal-left-side'>
            <h3>Create New Assignment</h3>

            <div className='modal-input-container'>
              <p>Title</p>
              <input type='text' name='' id='' placeholder='e.g Javascript' ref={titleRef} />
            </div>

            <div className='modal-input-container'>
              <p>Deadline</p>
              <input type='date' name='date' id='date' ref={deadlineRef} />
            </div>
            <div className='modal-input-container'>
              <p>Assignment Description</p>
            </div>
            <div className='text-editor'>
              <ReactQuill
                theme='snow'
                style={editorStyle}
                value={description}
                onChange={handleContentChange}
              />
            </div>
            <div></div>
            <div className='select-color'></div>
            <div className='buttons'>
              <button onClick={handlePublishSubmit}>Save and Publish</button>
              <button onClick={handleDraftSubmit}>Save as draft</button>
            </div>
          </div>
          <div className='modal-middle-line'></div>
          <div className='modal-right-side'>
            <h3>Invite Student</h3>
            <LecturerInviteStudentCard
              studentData={users}
              setSelectedUsers={setSelectedUsers}
              selectedUsers={selectedUsers}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default LecturerCreateNewAssignmentModal;
