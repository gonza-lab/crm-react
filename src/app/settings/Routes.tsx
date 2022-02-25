import { RouteObject } from 'react-router-dom';
import UserSettings from './user';

const settingsRoutes: RouteObject = {
  path: 'configuracion',
  children: [
    {
      path: 'usuario',
      element: <UserSettings />,
    },
  ],
};

export default settingsRoutes;
