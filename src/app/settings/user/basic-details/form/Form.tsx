import { FunctionComponent, useState } from 'react';

import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { LoadingButton } from '@mui/lab';

import { useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';

import { RootState } from '../../../../../state/store';
import { UserState, UserStoreStatus } from '../../../../../state/user/slice';

export interface InputBasicDetailsForm {
  first_name: string;
  last_name: string;
  password: string;
}

const BasicDetailsForm: FunctionComponent<{
  onSubmit?: (data: InputBasicDetailsForm) => void;
}> = ({ onSubmit }) => {
  const { data, status } = useSelector<RootState, UserState>(
    (state) => state.user
  );
  const { control, handleSubmit, setValue } = useForm<InputBasicDetailsForm>({
    defaultValues: {
      first_name: data?.first_name || '',
      last_name: data?.last_name || '',
      password: '',
    },
  });
  const [disabled, setDisabled] = useState(true);

  const _onSubmit = (data: InputBasicDetailsForm) => {
    onSubmit && onSubmit(data);
    setDisabled(true);
    setValue('password', '');
  };

  return (
    <form onSubmit={handleSubmit(_onSubmit)}>
      <Controller
        control={control}
        name="first_name"
        rules={{
          required: 'Debe ingresar su nombre.',
        }}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <TextField
            disabled={disabled}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            fullWidth
            label="Nombre"
            margin="normal"
            type="text"
            variant="outlined"
            error={!!error}
            helperText={error ? error.message : null}
            size="small"
          />
        )}
      />
      <Controller
        control={control}
        name="last_name"
        rules={{
          required: 'Debe ingresar su apellido.',
        }}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <TextField
            disabled={disabled}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            fullWidth
            label="Apellido"
            margin="normal"
            type="text"
            variant="outlined"
            error={!!error}
            helperText={error ? error.message : null}
            size="small"
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <TextField
            disabled={disabled}
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
            size="small"
          />
        )}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button
          onClick={() => setDisabled(false)}
          variant="outlined"
          size="small"
          disabled={!disabled}
        >
          Editar
        </Button>
        <LoadingButton
          onClick={() => setDisabled(false)}
          variant="contained"
          size="small"
          disabled={disabled}
          type="submit"
          loading={status === UserStoreStatus.updatingData}
        >
          Guardar
        </LoadingButton>
      </Box>
    </form>
  );
};

export default BasicDetailsForm;
