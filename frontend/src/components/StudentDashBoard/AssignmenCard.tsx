import '../../Styles/student-assignment-card.scss';

const AssignmenCard = ({handleShowDetails,lecturerName}:any) => {

  return (
    <div className='student-card' onClick={handleShowDetails}>
        <div className="title">
            <h4>JavaScript</h4>
        </div>

        <div className="student-card-body">
                <div className="card-paragraph">
                    <p>
                    Borem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Nunc vulputate libero et velit interdum, 
                    ac aliquet odio mattis..........
                    </p>
                </div>
                <div className="date">
                    <p>Due</p>
                    <p>1st May 2023</p>
                </div>
                <div className="student-card-footer">
                    <div className="student-card-footer-image">
                        <img src="" alt="" />
                    </div>
                    <div className="student-card-footer-text">
                        <p>Lecturer</p>
                        <p>{lecturerName}</p>
                    </div>
                </div>
        </div>
      
    </div>
  )
}

export default AssignmenCard
