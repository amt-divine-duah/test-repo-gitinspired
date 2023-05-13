import { useNavigate } from "react-router-dom";

const SubmissionCard = (prop: {height: number, width: number, title: string, numberOfSubmissions: number}) => {
  const navigate = useNavigate();
  const open = () => {
    navigate("/submissionClicked")
  }
  return (
    <div className="submission-card-wrapper" style={{height: prop.height, width: prop.width}} onClick={open}>
      <div className="folder-image">
        <img src="/folder.png" alt="folder icon" />

      </div>
      <div>
        <p className="submission-title">{prop.title}</p>
        <p  className="number-submissions">{prop.numberOfSubmissions}</p>
      </div>
    </div>
  );
};
export default SubmissionCard;
