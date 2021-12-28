import {
  Alert,
  Box,
  Container,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { login, UserState, UserStoreStatus } from '../../../state/user/slice';
import LoadingButton from '@mui/lab/LoadingButton';
import { RootState } from '../../../state/store';

const codeErrors: {
  [key: number]: string;
} = {
  404: 'El email que ha ingresado no se encuentra registrado.',
  401: 'La contraseña que ha ingresado es incorrecta.',
};

const LoginRoot = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
}));

interface Inputs {
  email: string;
  password: string;
}

const Login = () => {
  const { handleSubmit, control } = useForm<Inputs>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const dispatch = useDispatch();
  const { status, error } = useSelector<RootState, UserState>(
    (state) => state.user
  );

  const onSubmit: SubmitHandler<Inputs> = (data) => dispatch(login(data));

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Ingresar
              </Typography>
            </Box>
            <Controller
              control={control}
              name="email"
              rules={{
                required: 'Debe ingresar su email.',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Debe ingresar un email válido.',
                },
              }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <TextField
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  fullWidth
                  label="Email"
                  margin="normal"
                  type="email"
                  variant="outlined"
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              rules={{ required: 'Debe ingresar su contraseña.' }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <TextField
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  fullWidth
                  label="Contraseña"
                  margin="normal"
                  type="password"
                  variant="outlined"
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
            />
            <Box sx={{ py: 2 }}>
              <LoadingButton
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loadingPosition="start"
                loading={status === UserStoreStatus.loading}
              >
                Ingresar
              </LoadingButton>
            </Box>
            {error &&
              (codeErrors[error] ? (
                <Alert severity="error">{codeErrors[error]}</Alert>
              ) : (
                <Alert severity="error">
                  Ha ocurrido un error en el servidor. Porfavor, contacte al
                  administrador e informeselo. Intente ingresar nuevamente.
                </Alert>
              ))}
          </form>
        </Container>
      </Paper>
    </LoginRoot>
  );
};

export default Login;
