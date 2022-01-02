import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { FunctionComponent } from 'react';
import OrderDB from '../../../../interfaces/OrderDB';

const OrderDrawerTable: FunctionComponent<{ order: OrderDB }> = ({ order }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>DESCRIPCIÓN</TableCell>
          <TableCell>VALOR</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {order.product.map((product) => (
          <TableRow
            sx={{
              '> td': {
                borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
              },
            }}
            key={product.id}
          >
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.price}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OrderDrawerTable;
