import { FunctionComponent, useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

const LayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 280,
  },
}));

export const Layout: FunctionComponent = (props) => {
  const { children } = props;
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <LayoutRoot>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          {children}
        </Box>
      </LayoutRoot>
      <Navbar onSidebarOpen={() => setSidebarOpen(true)} />
      <Sidebar onClose={() => setSidebarOpen(false)} open={isSidebarOpen} />
    </>
  );
};
