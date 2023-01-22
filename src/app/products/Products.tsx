import { Box, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

const Products = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 3,
          mb: 3,
        }}
      >
        <Typography variant="h4">Productos</Typography>
        <Box>
          <Link to="/productos/nuevo">
            <Button variant="contained" startIcon={<AddIcon />}>
              Nuevo
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Products;
