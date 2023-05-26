import { CircularProgress } from '@mui/joy';
import DraftCard from '../../components/lecturer_dashboard/DraftCard';
import LecturerView from '../../components/lecturer_dashboard/LecturerView';
import useDraftData from '../../hooks/useDraftData';

const DraftTab = () => {
  const { drafts } = useDraftData();

  let contents;
  if (drafts === false) {
    contents = (
      <div className='landingPage'>
        <CircularProgress size='md' />
      </div>
    );
  } else if (drafts === undefined) {
    contents = <p>Could not load data</p>;
  } else if (drafts === null) {
    contents = <h2 className='page-header'>No drafts</h2>;
  } else {
    contents = (
      <>
        {Array.isArray(drafts) &&
          drafts.map((item, index) => {
            return (
              <DraftCard
                key={index}
                title={item.title}
                description={item.description}
                date={item.updatedAt}
                studentNumber={item._count.students}
              />
            );
          })}
      </>
    );
  }
  return (
    <LecturerView sidebar>
      <div className='main-content'>
        <div className='wrapper draft-container'>{contents}</div>
      </div>
    </LecturerView>
  );
};

export default DraftTab;
