import DraftCard from "../../components/Lecturer/DraftCard";
import LecturerMain from "../../components/LecturerMain";
import useDraft from "../../hooks/useDraft";


const DraftTab = () => {
  const { drafts } = useDraft();
  return (
    <LecturerMain sidebar>
      <div className="draft-dashboard">
        <div className="draft-container">
          {drafts.map((item, index) => {
            return (
              <DraftCard
                key={index}
                title={item.title}
                description={item.description}
                date={item.date}
                studentNumber={item.numberOfStudents}
              />
            );
          })}
        </div>
      </div>
    </LecturerMain>
  );
};

export default DraftTab;
