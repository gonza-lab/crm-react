import { Outlet } from 'react-router-dom';
import './App.scss';
import { DashboardLayout } from './app/shared/layout/dashboard-layout';

function App() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}

export default App;
