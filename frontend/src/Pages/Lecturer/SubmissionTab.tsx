import { useContext } from 'react';
import Actionbar from '../../components/lecturer_dashboard/Actionbar';
import LecturerView from '../../components/lecturer_dashboard/LecturerView';
import { SearchContext } from '../../components/lecturer_dashboard/SearchContext';
import SubmissionCard from '../../components/lecturer_dashboard/SubmissionCard';
import useSubmissions from '../../hooks/useSubmissions';

const SubmissionTab = () => {
  const { submissions } = useSubmissions();
  const data = useContext(SearchContext);
  const word = data.word;

  const output =
    Array.isArray(submissions) &&
    submissions.filter((item) => {
      return word === '' ? item : item.title.toLowerCase().includes(word.toLowerCase());
    });

  return (
    <LecturerView sidebar>
      <div className="'main-content">
        <div className='top-content'>
          <Actionbar />
        </div>
        <div className='wrapper submission-card'>
          {Array.isArray(output) &&
            output.map((item, index) => {
              return (
                <SubmissionCard
                  title={item.title}
                  numberOfSubmissions={item.submissions}
                  key={index}
                  id={item.id}
                />
              );
            })}
        </div>
      </div>
    </LecturerView>
  );
};

export default SubmissionTab;
