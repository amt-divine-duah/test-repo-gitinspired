import DraftCard from "../../components/Lecturer/DraftCard";
import useDraft from "../../hooks/useDraft";


const DraftTab = () => {
  const { drafts } = useDraft();
  return (
    <div className="draft-dashboard">
      <div className="draft-container">
      { drafts.map((item,index) => {
          return (
            <DraftCard key={index} title={item.title} description={item.description} date={item.date} studentNumber={item.numberOfStudents}/>
          )
        }) }
      </div>
    </div>
  );
};

export default DraftTab;
