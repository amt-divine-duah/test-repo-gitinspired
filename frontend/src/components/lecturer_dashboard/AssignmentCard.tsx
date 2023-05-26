import { AssignmentCardType } from './LecturerCustomTypes';
import parse from 'html-react-parser';
const AssignmentCard = (prop: AssignmentCardType) => {
  return (
    <div className='card-wrapper' id={prop.uniqueCode}>
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
          <p>{prop.deadline.slice(0, 10)}</p>
          <img src='/invite.png' alt='add button' />
        </div>
        <div className='assignment-uniqueness'>
          <p>Unique code</p>
          <div className='assignment-code'>
            <p>{prop.uniqueCode}</p>
            <img src='/copy.png' alt='copy-icon' />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AssignmentCard;
