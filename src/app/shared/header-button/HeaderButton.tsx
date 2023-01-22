import { FC } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

interface HeaderButtonProps {
  button: {
    text: string;
    href: string;
  };
  title: string;
}

const HeaderButton: FC<HeaderButtonProps> = ({ title, button }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: 3,
        mb: 3,
      }}
    >
      <Typography variant="h4">{title}</Typography>
      <Box>
        <Link to={button.href}>
          <Button variant="contained" startIcon={<AddIcon />}>
            {button.text}
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default HeaderButton;
