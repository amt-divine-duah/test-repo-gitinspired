import { MainProps } from './LecturerCustomTypes';
import Sidebar from './Sidebar';

const LecturerView = (props: MainProps) => {
  return (
    <div className='lecturer-view'>
      {props.sidebar && <Sidebar />}
      {props.children}
    </div>
  );
};

export default LecturerView;
