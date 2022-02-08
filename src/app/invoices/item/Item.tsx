import {
  Avatar as MuiAvatar,
  TableCell,
  TableRow as MuiTableRow,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import OrderDB from '../../../interfaces/OrderDB';
import { selectOrderById } from '../../../state/orders/slice';
import { RootState } from '../../../state/store';

const TableRow = styled(MuiTableRow)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: `${theme.shadows[2]}, ${theme.shadows[2]}`,
  transition: theme.transitions.create(['box-shadow']),
  ':hover': {
    boxShadow: `${theme.shadows[4]}, ${theme.shadows[4]}`,
  },
}));

const Avatar = styled(MuiAvatar)(({ theme }) => ({
  backgroundColor: theme.palette.neutral[500],
}));

const InvoiceItem: FunctionComponent<{ id: number | string }> = ({ id }) => {
  const order = useSelector<RootState, OrderDB | undefined>((state) =>
    selectOrderById(state, id)
  );

  if (!order) return <></>;

  return (
    <TableRow>
      <TableCell>
        {order.user && (
          <Avatar>
            {order.user.first_name[0]}
            {order.user.last_name && order.user.last_name[0]}
          </Avatar>
        )}
      </TableCell>
      <TableCell>
        {order.products.reduce(
          (acum, product) => acum + product.product.price,
          0
        )}
      </TableCell>
      <TableCell>{new Date(order.created_at).getDay()}</TableCell>
    </TableRow>
  );
};

export default InvoiceItem;
