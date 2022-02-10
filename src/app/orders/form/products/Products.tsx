import { Card, Grid } from '@mui/material';
import ProductDB from '../../../../interfaces/ProductDB';
import FormProductsSelector from './selector/Selector';

const FormProducts = () => {
  const handleAddProduct = (product: ProductDB) => {
    console.log(product);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormProductsSelector onAddProduct={handleAddProduct} />
      </Grid>
      <Grid item xs={12}>
        <Card>hola</Card>
      </Grid>
    </Grid>
  );
};

export default FormProducts;
