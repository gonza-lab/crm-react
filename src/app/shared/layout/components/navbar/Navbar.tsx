import { FunctionComponent } from 'react';

import { AppBar, IconButton, Theme, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';

import Avatar from './avatar/Avatar';

const NavbarRoot = styled(AppBar)(({ theme }: { theme: Theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

export const Navbar: FunctionComponent<{ onSidebarOpen: () => void }> = (
  props
) => {
  const { onSidebarOpen } = props;

  return (
    <>
      <NavbarRoot
        sx={{
          left: {
            lg: 280,
          },
          width: {
            lg: 'calc(100% - 280px)',
          },
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            justifyContent: {
              xs: 'space-between',
              lg: 'right',
            },
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: 'inline-flex',
                lg: 'none',
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Avatar />
        </Toolbar>
      </NavbarRoot>
    </>
  );
};
