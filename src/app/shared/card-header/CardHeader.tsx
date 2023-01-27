import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const CardHeader = styled(Box)(() => ({
  padding: '32px 24px',
  display: 'flex',
  alignItems: 'center',
  gap: 2 * 8,
}));

export default CardHeader;
