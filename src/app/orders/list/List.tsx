import { Box, Table, TableBody } from '@mui/material';

import { useSelector } from 'react-redux';

import { selectOrdersIds } from '../../../state/orders/slice';
import OrderListItem from '../item/Item';

const OrdersList = () => {
  const ids = useSelector(selectOrdersIds);

  return (
    <Box>
      <Table>
        <TableBody>
          {ids.map((id) => (
            <OrderListItem key={id} id={id} />
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default OrdersList;
