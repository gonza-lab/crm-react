import { Card, Grid } from '@mui/material';
import FormProductsSelector from './selector/Selector';

const FormProducts = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormProductsSelector />
      </Grid>
      <Grid item xs={12}>
        <Card>hola</Card>
      </Grid>
    </Grid>
  );
};

export default FormProducts;
