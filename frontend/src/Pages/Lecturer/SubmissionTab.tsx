import SubmissionCard from "../../components/Lecturer/SubmissionCard";
import LecturerMain from "../../components/LecturerMain";
import useData from "../../hooks/useAssignmentData";

const SubmissionTab = () => {
  const { assignments } = useData();

  return (
    <LecturerMain sidebar>
      <div className="submission-dashboard">
        <div className="submission-container">
          {assignments.map((item, index) => {
            return (
              <SubmissionCard
                width={349}
                height={165}
                title={item.title}
                numberOfSubmissions={item.numberOfStudents}
              />
            );
          })}
        </div>
      </div>
    </LecturerMain>
  );
};

export default SubmissionTab;
