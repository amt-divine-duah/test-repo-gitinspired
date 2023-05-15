import { useNavigate } from "react-router-dom";
import { AssignmentInterface } from "../../interfaces/AssigmentInterface";
const AssignmentCard = (prop: AssignmentInterface) => {
  const navigate = useNavigate();
  const cardClicked = (event: React.MouseEvent<HTMLDivElement>) => {
    const name = event.currentTarget.getAttribute("id");
    navigate(`/lecturer/assignmentClicked`, { state: { name: name } });
  };
    return (
      <div className="card-wrapper" onClick={cardClicked} id={prop.uniqueCode}>
        <div className="card-title">
          <h2>{prop.title}</h2>
        </div>
  
        <div className="assignment-description">
          <p>Description</p>
          <p>
          {prop.description}
          </p>
       
        <div className="assignment-features">
          <p>{prop.deadline}</p>
          <img src="/invite.png" alt="add button" />
        </div>
        <div className="assignment-uniqueness">
          <p>Unique code</p>
          <div className="assignment-code">
            <p>{prop.uniqueCode}</p>
            <img src="/doubleSquare.png" alt="copy-icon" />
          </div>
        </div>
        </div>
      </div>
    );
  };
  export default AssignmentCard;