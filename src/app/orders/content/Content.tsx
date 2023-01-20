import { FunctionComponent, useEffect, useState } from 'react';

import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Card,
  Container,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';

import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../state/store';
import { OrderState, OrderStatus } from '../../../state/orders/slice';
import OrdersList from '../list/List';
import { Link } from 'react-router-dom';
import Pagination from '../../shared/pagination/Pagination';
import { readAllOrders } from '../../../state/orders/reducer';

const Content = styled('div', {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'drawerWidth',
})<{ open?: boolean; drawerWidth: number }>(({ theme, open, drawerWidth }) => ({
  width: '100%',
  flexGrow: 1,
  zIndex: 1,
  padding: '64px 0 48px 0',
  [theme.breakpoints.up('md')]: {
    marginRight: `-${drawerWidth}px`,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  },
}));

const OrdersContent: FunctionComponent<{ drawerWidth: number }> = ({
  drawerWidth,
}) => {
  const dispatch = useDispatch();
  const { status, drawer, total_count } = useSelector<RootState, OrderState>(
    (state) => state.orders
  );
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(readAllOrders({ limit: rowsPerPage, offset: 0 }));
  }, [rowsPerPage]);

  useEffect(() => {
    dispatch(
      readAllOrders({
        limit: rowsPerPage,
        offset: rowsPerPage * page,
      })
    );
  }, [page]);

  return (
    <Content drawerWidth={drawerWidth} open={drawer.isOpen}>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Typography variant="h4">Pedidos</Typography>
          <Box>
            <Link to="/pedidos/nuevo">
              <Button variant="contained" startIcon={<AddIcon />}>
                Nuevo
              </Button>
            </Link>
          </Box>
        </Box>
        <Card>
          <Box
            sx={{
              height: 95.72 * rowsPerPage + 44.5,
              position: 'relative',
            }}
          >
            {status === OrderStatus.loadingOrders ? (
              <CircularProgress
                sx={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              />
            ) : (
              <OrdersList />
            )}
          </Box>
          <Pagination
            totalCount={total_count}
            onRowsPerPageChange={setRowsPerPage}
            onPageChange={setPage}
          />
        </Card>
      </Container>
    </Content>
  );
};

export default OrdersContent;
