import {
  Autocomplete,
  Box,
  Card,
  CardHeader,
  Container,
  Divider,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import LinkBack from '../../shared/link-back/LinkBack';
import userService from '../../../service/UserService';

const users = [
  { label: 'Gonzalo Flores' },
  { label: 'Agustina Arias' },
  { label: 'Ramiro Flores' },
  { label: 'Zahira Flores' },
  { label: 'Selena Flores' },
];

const OrderForm = () => {
  const [userQuery, setUserQuery] = useState('');
  const [timeOut, setTimeOutState] = useState<NodeJS.Timeout>();
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<{ label: string }[]>([]);

  useEffect(() => {
    if (timeOut) {
      setLoading(true);
      clearTimeout(timeOut);
    }

    setTimeOutState(
      setTimeout(async () => {
        if (userQuery) {
          const options = (await userService.searchByFullName(userQuery)).map(
            (user) => ({
              label: user.first_name + ' ' + user.last_name,
            })
          );
          console.log(options);
          setOptions(options);
          setLoading(false);
        }
      }, 1000)
    );
  }, [userQuery]);

  return (
    <Container maxWidth="md" sx={{ pt: 8 }}>
      <Box sx={{ mb: 4 }}>
        <LinkBack>Ordenes</LinkBack>
      </Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4">Nueva orden</Typography>
      </Box>
      <Card elevation={1}>
        <CardHeader
          title="Cliente"
          titleTypographyProps={{
            variant: 'h6',
          }}
          action={
            <Autocomplete
              loading={loading}
              options={options}
              renderInput={(params) => (
                <TextField
                  {...params}
                  value={userQuery}
                  onChange={({ target }) => setUserQuery(target.value)}
                />
              )}
              sx={{ width: 300 }}
            />
          }
          sx={{
            'div:first-of-type': {
              flexGrow: 0,
            },
            gap: 2,
          }}
        />
        <Divider />
      </Card>
    </Container>
  );
};

export default OrderForm;
