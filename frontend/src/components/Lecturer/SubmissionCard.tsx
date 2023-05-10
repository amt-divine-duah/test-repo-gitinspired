const SubmissionCard = (prop: {height: number, width: number, title: string, numberOfSubmissions: number}) => {
  return (
    <div className="submission-card-wrapper" style={{height: prop.height, width: prop.width}}>
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
