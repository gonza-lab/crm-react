import { Box, Table, TableBody } from '@mui/material';
import { useGetOrdersQuery } from '../../../state/orders/endpoints';
import InvoiceItem from '../item/Item';

const InvoiceList = () => {
  const { data: orders } = useGetOrdersQuery({});

  return (
    <Box>
      <Table sx={{ borderSpacing: '0 24px', borderCollapse: 'separate' }}>
        <TableBody>
          {(orders || []).map((order) => (
            <InvoiceItem key={order.id} order={order} />
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default InvoiceList;
