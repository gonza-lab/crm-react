import { FunctionComponent, useState } from 'react';
import {
  Alert,
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import LoadingButton from '@mui/lab/LoadingButton';

interface InputsLoginForm {
  email: string;
  password: string;
}

const LoginForm: FunctionComponent<{
  onSubmit?: (data: InputsLoginForm) => void;
  error?: string;
  isLoadingButton?: boolean;
}> = ({ onSubmit, error, isLoadingButton }) => {
  const { handleSubmit, control } = useForm<InputsLoginForm>({
    defaultValues: {
      email: 'gonzaflores358@gmail.com',
      password: 'password',
    },
  });

  const [typePassword, setStypePassword] = useState<'password' | 'text'>(
    'password'
  );

  const submitHandler: SubmitHandler<InputsLoginForm> = (data) =>
    onSubmit && onSubmit(data);

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
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
            type={typePassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() =>
                      setStypePassword(
                        typePassword === 'password' ? 'text' : 'password'
                      )
                    }
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    {typePassword !== 'password' ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
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
          loading={isLoadingButton}
        >
          Ingresar
        </LoadingButton>
      </Box>
      {error && <Alert severity="error">{error}</Alert>}
    </form>
  );
};

export default LoginForm;
