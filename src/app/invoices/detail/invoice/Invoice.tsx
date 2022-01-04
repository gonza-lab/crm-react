import { FunctionComponent } from 'react';

import {
  Paper,
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody as MuiTableBody,
} from '@mui/material';

import { styled } from '@mui/material/styles';

import { EntityId } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

import { selectOrderById } from '../../../../state/orders/slice';
import { RootState } from '../../../../state/store';
import OrderDB from '../../../../interfaces/OrderDB';

import logo from '../../../../static/images/logo512.png';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import toMoneyFormat from '../../../../util/toMoneyFormat';
import useResume from '../../../../hooks/useResume';

const TableBody = styled(MuiTableBody)(({ theme }) => ({
  td: {
    borderBottom: 'none',
  },
  'tr:not(:first-of-type)': {
    td: {
      borderTop: `1px solid ${theme.palette.divider}`,
    },
  },
  'tr:last-of-type': {
    td: {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
  },
}));

const InvoicesDetailInvoice: FunctionComponent<{ order: OrderDB }> = ({
  order,
}) => {
  if (!order) return <></>;

  const resume = useResume(order.product);

  return (
    <Paper sx={{ p: 6, overflowX: 'auto' }}>
      <Box
        sx={{
          minWidth: '800px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <img src={logo} alt="Logo de la empresa" width={42} height={42} />
            <Typography variant="subtitle2">www.crm.com.ar</Typography>
          </Box>
          <Box textAlign="right">
            <Typography variant="h4">PAGADO</Typography>
            <Typography variant="subtitle2">Comprobante #{order.id}</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Typography variant="body2">
            Street King William, 123 <br />
            Level 2, C, 442456
            <br />
            San Francisco, CA, USA
            <br />
          </Typography>
          <Typography variant="body2" textAlign="center">
            Company No. 4675933 <br />
            EU VAT No. 949 67545 45
          </Typography>
          <Typography variant="body2" textAlign="right">
            accounts@devias.io <br />
            (+40) 652 3456 23
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Box>
            <Typography variant="subtitle2">Fecha de emisión</Typography>
            <Typography variant="body2">
              {format(new Date(order.updatedAt), 'P', { locale: es })}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Typography variant="subtitle2">Facturado a:</Typography>
          <Typography variant="body2">
            {order.user?.first_name} {order.user?.last_name} <br />
            {order.user?.address}, {order.user?.locality}, {order.user?.city},{' '}
            {order.user?.country}.
          </Typography>
        </Box>
        <Table sx={{ mt: 4 }}>
          <TableHead>
            <TableRow>
              <TableCell>DESCRIPCIÓN</TableCell>
              <TableCell></TableCell>
              <TableCell align="right">PRECIO</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order.product.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell></TableCell>
                <TableCell align="right">
                  {toMoneyFormat(product.price)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <Typography variant="subtitle2">Subtotal</Typography>
              </TableCell>
              <TableCell align="right">{toMoneyFormat(resume.total)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <Typography variant="subtitle2">IVA</Typography>
              </TableCell>
              <TableCell align="right">{toMoneyFormat(resume.iva)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <Typography variant="subtitle2">Total</Typography>
              </TableCell>
              <TableCell align="right">
                {toMoneyFormat(resume.totalIva)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </Paper>
  );
};

export default InvoicesDetailInvoice;
