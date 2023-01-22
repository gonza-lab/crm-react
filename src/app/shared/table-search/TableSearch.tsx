import { ChangeEvent, FC } from 'react';
import { Box, CircularProgress, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface TableSearchProps {
  onSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  searching?: boolean;
  input: {
    placeholder: string;
  };
}

const TableSearch: FC<TableSearchProps> = ({ onSearch, searching, input }) => {
  return (
    <Box p={2} sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
      <SearchIcon />
      <InputBase
        onChange={onSearch}
        placeholder={input.placeholder}
        fullWidth
      />
      {searching && (
        <Box height={20}>
          <CircularProgress size={20} />
        </Box>
      )}
    </Box>
  );
};

export default TableSearch;
