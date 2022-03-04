import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthState } from '../../../state/auth/slice';
import { RootState } from '../../../state/store';

const RequireAuth: FunctionComponent = ({ children }) => {
  const { auth } = useSelector<RootState, AuthState>((state) => state.auth);
  const location = useLocation();

  if (!auth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
