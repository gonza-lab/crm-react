import { useRef } from 'react';

import { Box, CircularProgress, Container, Divider } from '@mui/material';

import { useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { RootState } from '../../../state/store';

import OrderDB from '../../../interfaces/OrderDB';

import { selectOrderById } from '../../../state/orders/slice';

import InvoicesDetailInvoice from './invoice/Invoice';
import InvoiceDetailsFunctions from './functions/Functions';

const InvoiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) return <></>;

  const ref = useRef(null);
  const order = useSelector<RootState, OrderDB | undefined>((state) =>
    selectOrderById(state, id)
  );

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <InvoiceDetailsFunctions elementToPrint={ref} />
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
