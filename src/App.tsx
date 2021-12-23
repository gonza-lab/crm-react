import { Outlet } from 'react-router-dom';
import './App.scss';
import { Layout } from './app/shared/layout/Layout';

function App() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export default App;
