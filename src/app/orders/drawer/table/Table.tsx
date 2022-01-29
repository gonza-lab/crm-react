import { FunctionComponent } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

import OrderDB from '../../../../interfaces/OrderDB';

import toMoneyFormat from '../../../../util/toMoneyFormat';

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
        {order.products.map((product) => (
          <TableRow
            sx={{
              '> td': {
                borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
              },
            }}
            key={product.id}
          >
            <TableCell>{product.name}</TableCell>
            <TableCell>{toMoneyFormat(product.price)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OrderDrawerTable;
