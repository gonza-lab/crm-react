import { Box, IconButton, Typography, Divider, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FC } from 'react';
import Spinner from '../../../shared/spinner/Spinner';
import CloseIcon from '@mui/icons-material/Close';
import OrderDrawerList from '../list/List';
import OrderDrawerTable from '../table/Table';
import { Link } from 'react-router-dom';
import { useGetOrderByIdQuery } from '../../../../state/orders/endpoints';

const Header = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

interface DrawerContentProps {
  orderId: number;
  onClose: () => void;
}

const OrdersDrawerContent: FC<DrawerContentProps> = ({ orderId, onClose }) => {
  const { data: order, isFetching } = useGetOrderByIdQuery(orderId);

  return !order || isFetching ? (
    <Spinner />
  ) : (
    <>
      <Header
        sx={{
          height: '68px',
          display: 'flex',
          flexShrink: 0,
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 2,
          color: '#fff',
        }}
      >
        <Typography variant="h6">Pedido #{order.id}</Typography>
        <IconButton onClick={onClose} sx={{ color: 'inherit' }}>
          <CloseIcon />
        </IconButton>
      </Header>
      <Box sx={{ px: 3, py: 4, height: '100%', overflow: 'auto' }}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Detalles
        </Typography>
        <OrderDrawerList order={order} />
        <Divider />
        <Typography variant="h6" sx={{ my: 3 }}>
          Articulos
        </Typography>
        <OrderDrawerTable order={order} />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Link to={['/recibos', order.id, 'detalle'].join('/')}>
            <Button variant="contained">Ver comprobante</Button>
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default OrdersDrawerContent;
