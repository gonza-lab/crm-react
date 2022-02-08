import { FunctionComponent } from 'react';

import { List, ListItem as MuiListItem, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import format from 'date-fns/format';
import { es } from 'date-fns/locale';

import OrderDB from '../../../../interfaces/OrderDB';
import toMoneyFormat from '../../../../util/toMoneyFormat';

const ListItem = styled(MuiListItem)(() => ({
  display: 'flex',
  alignItems: 'flex-start',
  padding: '12px 0',
  '> *': {
    width: '100%',
    fontSize: '0.875rem',
  },
}));

const OrderDrawerList: FunctionComponent<{ order: OrderDB }> = ({ order }) => {
  return (
    <List>
      <ListItem disablePadding>
        <Typography variant="h6">ID</Typography>
        <Typography variant="body2" color="textSecondary">
          {order.id}
        </Typography>
      </ListItem>
      <ListItem disablePadding>
        <Typography variant="h6">Cliente</Typography>
        {order.user && (
          <Typography variant="body2" color="textSecondary">
            {order.user?.first_name} {order.user?.last_name}
          </Typography>
        )}
      </ListItem>
      <ListItem disablePadding>
        <Typography variant="h6">Fecha</Typography>
        <Typography variant="body2" color="textSecondary">
          {format(new Date(order.updated_at), 'Pp', { locale: es })}
        </Typography>
      </ListItem>
      <ListItem disablePadding>
        <Typography variant="h6">Ubicación</Typography>
        <Box>
          <Typography variant="body2" color="textSecondary">
            {order.user?.address},
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {order.user?.locality},
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {order.user?.city}
          </Typography>
        </Box>
      </ListItem>
      <ListItem disablePadding>
        <Typography variant="h6">Valor total</Typography>
        <Typography variant="body2" color="textSecondary">
          {toMoneyFormat(
            order.products.reduce(
              (acum, product) => acum + product.product.price,
              0
            )
          )}
        </Typography>
      </ListItem>
    </List>
  );
};

export default OrderDrawerList;
