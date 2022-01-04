import {
  Box,
  CircularProgress,
  Container,
  Divider,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useNavigate, useParams } from 'react-router-dom';

import InvoicesDetailInvoice from './invoice/Invoice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../state/store';
import OrderDB from '../../../interfaces/OrderDB';
import { selectOrderById } from '../../../state/orders/slice';

const InvoiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  if (!id) return <></>;

  const order = useSelector<RootState, OrderDB | undefined>((state) =>
    selectOrderById(state, id)
  );

  const goBack = () => navigate(-1);

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography
        variant="subtitle2"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          cursor: 'pointer',
          ':hover': {
            textDecoration: 'underline',
          },
        }}
        onClick={goBack}
      >
        <ArrowBackIcon fontSize="small" />
        Volver
      </Typography>
      <Divider sx={{ my: 4 }} />
      {order ? (
        <InvoicesDetailInvoice order={order} />
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
};

export default InvoiceDetail;
