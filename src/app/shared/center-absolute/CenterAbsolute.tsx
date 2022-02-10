import { Box } from '@mui/material';
import { FunctionComponent } from 'react';

const CenterAbsolute: FunctionComponent<{ component?: React.ElementType }> = ({
  children,
  component,
}) => {
  return (
    <Box
      component={component}
      sx={{
        right: '50%',
        top: '50%',
        position: 'absolute',
        transform: 'translate(50%, 0%)',
      }}
    >
      {children}
    </Box>
  );
};

export default CenterAbsolute;
