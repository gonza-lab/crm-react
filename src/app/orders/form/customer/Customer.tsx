import {
  Autocomplete,
  Box,
  Card,
  CircularProgress,
  Divider,
  InputLabel,
  List,
  ListItem as MuiListItem,
  TextField,
  Typography,
} from '@mui/material';
import { FunctionComponent, useState } from 'react';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import UserDB from '../../../../interfaces/UserDB';
import { RootState } from '../../../../state/store';
import { selectAllUsers, UserStoreStatus } from '../../../../state/users/slice';
import { useTheme } from '@mui/material/styles';
import CardHeader from '../../../shared/card-header/CardHeader';

const ListItem = styled(MuiListItem)(() => ({
  padding: '12px 24px',
}));

const ListItemLabel: FunctionComponent<{ label: string }> = ({
  children,
  label,
}) => (
  <ListItem
    sx={{
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },
      alignItems: 'flex-start',
    }}
  >
    <Typography variant="subtitle2" sx={{ minWidth: { md: 180 } }}>
      {label}
    </Typography>
    {children}
  </ListItem>
);

const FormCustomer: FunctionComponent<{
  onChangeUser: (user: UserDB | null) => void;
  error?: string | boolean;
  initUser?: UserDB;
}> = ({ onChangeUser, error, initUser }) => {
  const users = useSelector<RootState, UserDB[]>((state) =>
    selectAllUsers(state)
  );
  const status = useSelector<RootState, UserStoreStatus>(
    (state) => state.users.status
  );
  const [user, setUser] = useState<UserDB | undefined>(initUser);
  const theme = useTheme();

  return (
    <Box>
      {status === UserStoreStatus.loadingUsers ? (
        <Card
          elevation={1}
          sx={{
            height: 213,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </Card>
      ) : (
        <>
          <Card elevation={1}>
            <CardHeader>
              <Typography variant="h6" sx={{ display: 'flex' }}>
                Cliente
              </Typography>
              <Autocomplete
                options={users}
                getOptionLabel={(user) =>
                  user.first_name + ' ' + user.last_name
                }
                renderOption={(props, option) => (
                  <li
                    {...props}
                    style={{
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                    }}
                  >
                    <span>
                      {option.first_name} {option.last_name}
                    </span>
                    <Typography
                      variant="caption"
                      color={theme.palette.text.secondary}
                    >
                      {option.email}
                    </Typography>
                  </li>
                )}
                renderInput={(params) => <TextField {...params} />}
                sx={{ maxWidth: 300, width: '100%' }}
                value={user}
                onChange={(e, value) => {
                  setUser(value || undefined);
                  onChangeUser(value);
                }}
              />
            </CardHeader>
            <Divider />
            <List disablePadding>
              <ListItemLabel label="ID">
                {user && (
                  <Typography variant="body2" color="textSecondary">
                    {user.id}
                  </Typography>
                )}
              </ListItemLabel>
              <Divider />
              <ListItemLabel label="Ubicación">
                <Box sx={{ flex: '1 1 0%', flexDirection: 'column' }}>
                  {user && (
                    <>
                      <Typography variant="body2" color="textSecondary">
                        {user.address},
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {user.locality},
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {user.city},
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {user.country}.
                      </Typography>
                    </>
                  )}
                </Box>
              </ListItemLabel>
            </List>
          </Card>
          {error && (
            <InputLabel error sx={{ mt: 1 }}>
              {error}
            </InputLabel>
          )}
        </>
      )}
    </Box>
  );
};

export default FormCustomer;
