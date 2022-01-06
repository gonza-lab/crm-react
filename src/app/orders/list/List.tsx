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

import { useSelector } from 'react-redux';

import useCheckboxTable from '../../../hooks/useCheckboxTable';
import { selectOrdersIds } from '../../../state/orders/slice';

import OrderListItem from '../item/Item';
import OrdersPrintMultiple from '../print-multiple/PrintMultiple';

const TableHeadActions = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.neutral[100],
  padding: '1px 16px',
  width: '100%',
}));

const OrdersList = () => {
  const ids = useSelector(selectOrdersIds);
  const { handleToggle, handleToggleAll, selectedItems } =
    useCheckboxTable(ids);

  return (
    <Box>
      {!!selectedItems.length && (
        <TableHeadActions>
          <Checkbox
            onChange={handleToggleAll}
            checked={selectedItems.length === ids.length}
            indeterminate={
              Boolean(selectedItems.length) &&
              selectedItems.length !== ids.length
            }
          />
          <OrdersPrintMultiple orders={selectedItems} />
        </TableHeadActions>
      )}
      <Table>
        {!selectedItems.length && (
          <TableHead>
            <TableRow>
              <TableCell padding="none" sx={{ pl: 2 }}>
                <Checkbox
                  onChange={handleToggleAll}
                  checked={selectedItems.length === ids.length}
                />
              </TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Valor</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell width={80}></TableCell>
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          {ids.map((id) => (
            <OrderListItem
              checked={selectedItems.includes(id)}
              onToggle={handleToggle}
              key={id}
              id={id}
            />
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default OrdersList;
