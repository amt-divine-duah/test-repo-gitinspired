const DraftCard = (prop: {title: string, description: string, date: string, studentNumber: number}) => {
    return (
      <div className="draft-card">
        <div className="draft-title">
          <p>{prop.title}</p>
        </div>
  
        <div className="draft-description">
          <p>{prop.description} </p>
  
          <div className="draft-features">
            <div className="draft-feature-top">
              <p>{prop.date}</p>
              <img src="/edit.png" alt="edit button" />
            </div>
            <div>
              <p>{prop.studentNumber} students invited</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  export default DraftCard;
  