import { useState } from 'react';
import {
  Avatar as MuiAvatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
} from '@mui/material';
import { Logout, Settings } from '@mui/icons-material';

import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../../../../state/store';
import { logout, UserState } from '../../../../../../state/user/slice';

const Avatar = () => {
  const dispatch = useDispatch();
  const user = useSelector<RootState, UserState>((state) => state.user);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const handleClick = (e: any) => {
    setAnchorEl(e.currentTarget as Element);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <MuiAvatar
        sx={{
          height: 40,
          width: 40,
          ml: 1,
          cursor: 'pointer',
        }}
        onClick={handleClick}
      >
        {user.data?.first_name[0].toUpperCase()}
      </MuiAvatar>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 16,
          sx: {
            width: '200px',
            overflow: 'visible',
            mt: 1.5,
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Configuración
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => dispatch(logout())}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Salir
        </MenuItem>
      </Menu>
    </>
  );
};

export default Avatar;
