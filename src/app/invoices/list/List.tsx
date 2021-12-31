import { Box, Table, TableBody } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectOrdersIds } from '../../../state/orders/slice';
import InvoiceItem from '../item/Item';

const InvoiceList = () => {
  const ids = useSelector(selectOrdersIds);

  return (
    <Box>
      <Table sx={{ borderSpacing: '0 24px', borderCollapse: 'separate' }}>
        <TableBody>
          {ids.map((id) => (
            <InvoiceItem key={id} id={id} />
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default InvoiceList;
