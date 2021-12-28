import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { RootState } from '../state/store';
import {
  renew,
  setStatus,
  UserState,
  UserStoreStatus,
} from '../state/user/slice';
import LoadingPage from './loading';

import Router from './Router';

function App() {
  const dispatch = useDispatch();
  const { data: user, status } = useSelector<RootState, UserState>(
    (state) => state.user
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('x-token')) {
      navigate('/login');
      dispatch(setStatus(UserStoreStatus.idle));
      return;
    }

    dispatch(renew());
  }, []);

  useEffect(() => {
    if (user) navigate('/');
  }, [user]);

  if (status === UserStoreStatus.renew) return <LoadingPage />;

  return <Router />;
}

export default App;
