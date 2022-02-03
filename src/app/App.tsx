import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { RootState } from '../state/store';
import {
  renew,
  setStatus,
  AuthState,
  AuthStoreStatus,
} from '../state/user/slice';
import LoadingPage from './loading';

import Router from './Router';

function App() {
  const dispatch = useDispatch();
  const { data: user, status } = useSelector<RootState, AuthState>(
    (state) => state.auth
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('x-token')) {
      navigate('/login');
      dispatch(setStatus(AuthStoreStatus.idle));
      return;
    }

    dispatch(renew());
  }, []);

  if (status === AuthStoreStatus.renew) return <LoadingPage />;

  return <Router />;
}

export default App;
