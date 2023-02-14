import {
  Box,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { FC } from 'react';

import useCheckboxTable from '../../../hooks/useCheckboxTable';
import OrderDB from '../../../interfaces/OrderDB';

import OrderListItem from '../item/Item';
import OrdersPrintMultiple from '../print-multiple/PrintMultiple';

const TableHeadActions = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.neutral[100],
  padding: '1px 16px',
  width: '100%',
}));

interface OrdersListProps {
  orders: OrderDB[];
}

const OrdersList: FC<OrdersListProps> = ({ orders }) => {
  const { handleToggle, handleToggleAll, selectedItems } = useCheckboxTable(
    orders.map(({ id }) => id)
  );

  return (
    <Box sx={{ overflowX: 'auto' }}>
      {!!selectedItems.length && (
        <TableHeadActions>
          <Checkbox
            onChange={handleToggleAll}
            checked={selectedItems.length === orders.length}
            indeterminate={
              Boolean(selectedItems.length) &&
              selectedItems.length !== orders.length
            }
          />
          <OrdersPrintMultiple orders={selectedItems} />
        </TableHeadActions>
      )}
      <Table>
        {!selectedItems.length && (
          <TableHead>
            <TableRow>
              <TableCell padding="none" width={50} sx={{ pl: 2 }}>
                <Checkbox
                  onChange={handleToggleAll}
                  checked={selectedItems.length === orders.length}
                />
              </TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Valor</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell sx={{ textAlign: 'right' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          {orders.map((order) => (
            <OrderListItem
              checked={selectedItems.includes(order.id)}
              onToggle={handleToggle}
              key={order.id}
              order={order}
            />
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default OrdersList;
