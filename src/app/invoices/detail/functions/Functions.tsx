import { FunctionComponent, useState } from 'react';

import { Box, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PrintIcon from '@mui/icons-material/Print';
import { LoadingButton } from '@mui/lab';

import { useNavigate } from 'react-router-dom';

import { useReactToPrint } from 'react-to-print';

const InvoicesDetailFunctions: FunctionComponent<{ elementToPrint: any }> = ({
  elementToPrint,
}) => {
  const navigate = useNavigate();
  const [isLoadingPrint, setIsLoadingPrint] = useState(false);

  const handlePrint = useReactToPrint({
    content: () => elementToPrint.current,
    onBeforePrint: () => setIsLoadingPrint(true),
    onAfterPrint: () => setIsLoadingPrint(false),
  });

  const goBack = () => navigate(-1);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography
        variant="subtitle2"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          cursor: 'pointer',
          ':hover': {
            textDecoration: 'underline',
          },
        }}
        onClick={goBack}
      >
        <ArrowBackIcon fontSize="small" />
        Volver
      </Typography>
      <LoadingButton
        onClick={handlePrint}
        variant="contained"
        startIcon={<PrintIcon />}
        loading={isLoadingPrint}
      >
        Imprimir
      </LoadingButton>
    </Box>
  );
};

export default InvoicesDetailFunctions;
