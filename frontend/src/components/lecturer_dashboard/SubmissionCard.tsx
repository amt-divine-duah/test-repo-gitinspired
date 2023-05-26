import { useNavigate } from "react-router-dom";

const SubmissionCard = (prop: { title: string, numberOfSubmissions: number , id: number}) => {
  const navigate = useNavigate();
  const open = () => {
    navigate("/lecturer/submissionClicked",{ state: { name: prop.id } })
  }
 
  return (
    <div className="submission-card-wrapper"  onClick={open}>
      <div className="folder-image">
        <img src="/folder.png" alt="folder icon" />

      </div>
      <div className="submission-inscription">
        <p className="submission-title">  {prop.title.length > 13
            ? prop.title?.slice(0, 13) + '.'
            : prop.title}</p>
        <p  className="number-submissions">{prop.numberOfSubmissions} submissions</p>
      </div>
    </div>
  );
};
export default SubmissionCard;
