import {
  Box,
  Button,
  Container,
  Link,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link as LinkRouter } from 'react-router-dom';

const LoginRoot = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
}));

const Login = () => {
  return (
    <LoginRoot
      component="main"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
        minHeight: '100%',
        pl: 2,
        pr: 2,
      }}
    >
      <Paper
        elevation={16}
        sx={{
          p: 4,
        }}
      >
        <Container maxWidth="sm">
          <LinkRouter to="/">
            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
            >
              Inicio
            </Button>
          </LinkRouter>
          <form>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Sign in
              </Typography>
            </Box>
            <TextField
              fullWidth
              label="Email Address"
              margin="normal"
              name="email"
              type="email"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Password"
              margin="normal"
              name="password"
              type="password"
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign In Now
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body2">
              Don&apos;t have an account?{' '}
              <LinkRouter to="/register">
                <Link
                  component="span"
                  variant="subtitle2"
                  underline="hover"
                  sx={{
                    cursor: 'pointer',
                  }}
                >
                  Sign Up
                </Link>
              </LinkRouter>
            </Typography>
          </form>
        </Container>
      </Paper>
    </LoginRoot>
  );
};

export default Login;
