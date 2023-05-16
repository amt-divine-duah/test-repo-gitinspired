import "../../Styles/studentAssignmentInformation.scss";

const StudentAssignmentInformation = ({ showDetails }: any) => {
  return (
    <div
      className={
        showDetails === true ? "StudentAssignmentDetails" : "details-hidden"
      }
    >
      <div className="assignment-details-head">
      <h1>Javascript</h1>
      <div className="not-submitted">
        <p>100pt</p>
        <div className="not-submitted-with-image">
          <img src="" alt="" />
          <p>Not submitted</p>
        </div>
      </div>
      <div className="date">
        <p>Due</p>
        <p>1st May 2023</p>
      </div>
      </div>
      <div className="assignment-details-body">
      <h4>Description</h4>
      <p>
        Your task is to develop a web application using JavaScript that provides
        a user-friendly interface for tracking and managing tasks. The
        application should allow users to add, edit, and delete tasks, and
        display them in a clear and organized way. The interface should be
        responsive and intuitive, and incorporate JavaScript's dynamic
        functionality to provide a seamless user experience. In addition to the
        core features of the task management system, you should also implement
        at least one advanced feature using JavaScript. This could include
        integration with a third-party API, real-time updates using AJAX or
        WebSockets, or any other advanced feature that demonstrates your
        understanding and proficiency with the language. To complete this
        assignment, you should have a solid understanding of JavaScript syntax,
        DOM manipulation, and event handling. You should also have experience
        working with HTML and CSS, and be able to integrate your JavaScript code
        into a web page. Good luck and happy coding!
      </p>
      </div>
      <div className="assignment-details-button">
      <button>Add Submission</button>
      </div>
     
    </div>
  );
};

export default StudentAssignmentInformation;
