import { Container, Divider, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useNavigate, useParams } from 'react-router-dom';

import InvoicesDetailInvoice from './invoice/Invoice';

const InvoiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  if (!id) return <></>;

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
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
      <Divider sx={{ my: 4 }} />
      <InvoicesDetailInvoice id={id} />
    </Container>
  );
};

export default InvoiceDetail;
