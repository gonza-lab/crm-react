import { TextField, TextFieldProps } from '@mui/material';
import { FunctionComponent } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

const Input: FunctionComponent<{
  controllerProps: UseControllerProps;
  textFieldProps?: TextFieldProps;
}> = ({ controllerProps, textFieldProps }) => {
  const {
    field: { onChange, onBlur, name, value, ref },
    fieldState: { error, invalid },
  } = useController(controllerProps);

  return (
    <TextField
      {...textFieldProps}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      name={name}
      inputRef={ref}
      error={invalid}
      helperText={error ? error.message : null}
    />
  );
};

export default Input;
