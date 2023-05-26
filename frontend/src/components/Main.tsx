import { MainProps } from '../customTypesAndInterface/AdminCustomTypes';
import NavBar from './admin_dashboard_components/NavBar';
import StudentsNavBar from './students_dashboard_components/StudentsNavBar';

const Main = (props: MainProps) => {
  return (
    <>
      {props.header && <NavBar />}
      {props.studentHeader && <StudentsNavBar />}
      {props.children}
    </>
  );
};

export default Main;
