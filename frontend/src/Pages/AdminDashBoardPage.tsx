import Main from '../components/Main';
import AdminMainDashBoard from '../components/admin_dashboard_components/AdminDashBoard';

const AdminDashBoardPage = () => {
  return (
    <main className='admin-dash-board'>
      <Main header>
        <AdminMainDashBoard />
      </Main>
    </main>
  );
};

export default AdminDashBoardPage;
