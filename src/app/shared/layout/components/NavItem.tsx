import { Box, Button, ListItem } from '@mui/material';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import { FunctionComponent } from 'react';

export const NavItem: FunctionComponent<{
  href: string;
  icon: JSX.Element;
  title: string;
}> = (props) => {
  const { href, icon, title, ...others } = props;
  const resolved = useResolvedPath(href);
  const active = useMatch({ path: resolved.pathname, end: false });

  return (
    <ListItem
      disableGutters
      sx={{
        display: 'flex',
        mb: 0.5,
        py: 0,
        px: 2,
      }}
      {...others}
    >
      <Link to={href} style={{ textDecoration: 'none', width: '100%' }}>
        <Button
          startIcon={icon}
          disableRipple
          sx={{
            backgroundColor: active && 'rgba(255,255,255, 0.08)',
            borderRadius: 1,
            color: active ? 'secondary.main' : 'neutral.300',
            fontWeight: active && 'fontWeightBold',
            justifyContent: 'flex-start',
            px: 3,
            textAlign: 'left',
            textTransform: 'none',
            width: '100%',
            '& .MuiButton-startIcon': {
              color: active ? 'secondary.main' : 'neutral.400',
            },
            '&:hover': {
              backgroundColor: 'rgba(255,255,255, 0.08)',
            },
          }}
        >
          <Box sx={{ flexGrow: 1 }}>{title}</Box>
        </Button>
      </Link>
    </ListItem>
  );
};
