import { useRef } from 'react';
import { AssignmentCardType } from './LecturerCustomTypes';
import parse from 'html-react-parser';
import { useNavigate } from 'react-router-dom';
const AssignmentCard = (prop: AssignmentCardType) => {

  const copyRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const assignmentId = prop.id;

  const copyCode = () => {
    const code = copyRef.current?.innerHTML as string;
    navigator.clipboard.writeText(code);
  }

  const cardClicked = (e: React.BaseSyntheticEvent) => {

    if(e.target.id !== 'copy-press' ) {
         navigate(`/lecturer/assignmentClicked`, { state: { name: assignmentId } });
    }
 
   };
  return (
    <div className='card-wrapper' id={prop.uniqueCode} onClick={cardClicked}>
      <div className='card-title'>
        <h2>{prop.title}</h2>
      </div>

      <div className='assignment-description'>
        <p>Description</p>
        <p>
          {prop.description.length > 140
            ? parse(prop.description?.slice(0, 140) + '...')
            : parse(prop.description)}
        </p>

        <div className='assignment-features'>
          <p>{new Date(prop.deadline).toDateString().slice(3)}</p>
          <img src='/invite.png' alt='add button' />
        </div>
        <div className='assignment-uniqueness'>
          <p>Unique code</p>
          <div className='assignment-code'>
            <p ref={copyRef}>{prop.uniqueCode}</p>
            <img src='/copy.png' alt='copy-icon' onClick={copyCode} id='copy-press'/>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AssignmentCard;
