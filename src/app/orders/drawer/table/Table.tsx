import { FunctionComponent } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import OrderDB from '../../../../interfaces/OrderDB';

import toMoneyFormat from '../../../../util/toMoneyFormat';

const OrderDrawerTable: FunctionComponent<{ order: OrderDB }> = ({ order }) => {
  const theme = useTheme();

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>CANTIDAD</TableCell>
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
            key={product.product.id}
          >
            <TableCell>{product.quantity}</TableCell>
            <TableCell>
              {product.product.name} <br />
              <Typography
                variant="caption"
                color={theme.palette.text.secondary}
              >
                {toMoneyFormat(product.product.price)}
              </Typography>{' '}
            </TableCell>
            <TableCell>
              {toMoneyFormat(product.quantity * product.product.price)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OrderDrawerTable;
