import { useRef } from 'react';

import { Box, CircularProgress, Container, Divider } from '@mui/material';

import { useParams } from 'react-router-dom';

import { useGetOrderByIdQuery } from '../../../state/orders/slice';

import InvoicesDetailInvoice from './invoice/Invoice';
import InvoiceDetailsFunctions from './functions/Functions';

const InvoiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) return <></>;

  const ref = useRef(null);

  const { data: order, isFetching } = useGetOrderByIdQuery(+id);

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <InvoiceDetailsFunctions elementToPrint={ref} />
      <Divider sx={{ my: 4 }} />
      {order && !isFetching ? (
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
