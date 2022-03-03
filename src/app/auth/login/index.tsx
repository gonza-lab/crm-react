import { useEffect } from 'react';

import { Box, Container, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../state/store';
import { login, AuthState, AuthStoreStatus } from '../../../state/auth/slice';
import LoginForm from './form/Form';

const codeErrors: {
  [key: number]: string;
} = {
  404: 'El email que ha ingresado no se encuentra registrado.',
  401: 'La contraseña que ha ingresado es incorrecta.',
};

const LoginRoot = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
}));

const LoginIndex = () => {
  const dispatch = useDispatch();
  const { status, error, data } = useSelector<RootState, AuthState>(
    (state) => state.auth
  );
  const navigate = useNavigate();

  const onSubmit = (data: { email: string; password: string }) =>
    dispatch(login(data));

  useEffect(() => {
    if (data) navigate('/', { replace: true });
  }, [data]);

  return (
    <LoginRoot
      component="main"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
        minHeight: '100%',
        pl: 2,
        pr: 2,
      }}
    >
      <Paper
        elevation={16}
        sx={{
          p: 4,
        }}
      >
        <Container maxWidth="sm">
          <LoginForm
            onSubmit={onSubmit}
            isLoadingButton={status === AuthStoreStatus.loading}
            error={
              error
                ? codeErrors[error]
                  ? codeErrors[error]
                  : 'Ha ocurrido un error en el servidor. Porfavor, contacte al administrador e informeselo. Intente ingresar nuevamente.'
                : undefined
            }
          />
        </Container>
      </Paper>
    </LoginRoot>
  );
};

export default LoginIndex;
