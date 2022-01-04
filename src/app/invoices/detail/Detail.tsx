import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PrintIcon from '@mui/icons-material/Print';

import { useNavigate, useParams } from 'react-router-dom';

import InvoicesDetailInvoice from './invoice/Invoice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../state/store';
import OrderDB from '../../../interfaces/OrderDB';
import { selectOrderById } from '../../../state/orders/slice';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const InvoiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) return <></>;

  const ref = useRef(null);
  const navigate = useNavigate();
  const order = useSelector<RootState, OrderDB | undefined>((state) =>
    selectOrderById(state, id)
  );

  const goBack = () => navigate(-1);
  const handlePrint = useReactToPrint({
    content: () => ref.current,
  });

  console.log(ref);

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
        <Button
          onClick={handlePrint}
          variant="contained"
          startIcon={<PrintIcon />}
        >
          Imprimir
        </Button>
      </Box>
      <Divider sx={{ my: 4 }} />
      {order ? (
        <InvoicesDetailInvoice innerRef={ref} order={order} />
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
};

export default InvoiceDetail;
