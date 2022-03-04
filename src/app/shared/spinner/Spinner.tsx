import { Box, CircularProgress } from '@mui/material';

const Spinner = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(50%, 50%)',
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Spinner;
