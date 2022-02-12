import { FunctionComponent } from 'react';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import ProductDB from '../../../../../../interfaces/ProductDB';
import toMoneyFormat from '../../../../../../util/toMoneyFormat';

const FormProductsSummaryDetail: FunctionComponent<{
  product: ProductDB;
  quantity: number;
  onChangeValue: (product: ProductDB, value: number) => void;
  onDelete: (product: ProductDB) => void;
}> = ({ product, quantity, onChangeValue, onDelete }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <IconButton
        onClick={() => onDelete(product)}
        size="small"
        sx={{ mr: 2, alignSelf: 'flex-start' }}
      >
        <ClearIcon fontSize="small" />
      </IconButton>
      <Box sx={{ width: '100%' }}>
        <Typography variant="subtitle2">{product.name}</Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
          {toMoneyFormat(product.price)}
        </Typography>
      </Box>
      <Box sx={{ flexShrink: 0 }}>
        <TextField
          sx={{ width: 58 }}
          inputProps={{
            style: { textAlign: 'right' },
            inputMode: 'numeric',
            pattern: '[0-9]*',
          }}
          size="small"
          value={quantity}
          onChange={(e) => onChangeValue(product, +e.target.value)}
        />
      </Box>
    </Box>
  );
};

export default FormProductsSummaryDetail;
