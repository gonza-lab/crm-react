import { RouteObject } from 'react-router-dom';
import UserSettings from './user';

const settingsRoutes: RouteObject = {
  path: 'settings',
  children: [
    {
      path: 'user',
      element: <UserSettings />,
    },
  ],
};

export default settingsRoutes;
