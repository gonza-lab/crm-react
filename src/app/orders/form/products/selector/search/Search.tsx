import { Box, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { ChangeEvent, FunctionComponent } from 'react';

const FormProductsSearch: FunctionComponent<{
  onSearch: (event: ChangeEvent<HTMLInputElement>) => void;
}> = ({ onSearch }) => {
  return (
    <Box p={2} sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
      <SearchIcon />
      <InputBase
        onChange={onSearch}
        placeholder="Buscar producto por nombre"
        fullWidth
      />
    </Box>
  );
};

export default FormProductsSearch;
