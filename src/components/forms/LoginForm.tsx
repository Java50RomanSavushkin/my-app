import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LoginData } from '../../model/LoginData';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import { useDispatch, useSelector } from 'react-redux';
import { codeActions } from '../../redux/codeSlice';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.tel-ran.com/">
       Tel-Ran
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
 
const theme = createTheme();
type Props = {
    submitFn: (loginData: LoginData)=> void,
    
}
export const LoginForm: React.FC<Props> = ({submitFn}) => {
const dispatch = useDispatch();
const code = useSelector<any,string>(state => state.codeState.code)
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    submitFn({
      email: data.get('email') as string,
      password: data.get('password') as string,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
             
              <Grid item>
              {code !== 'OK' && <Alert severity='error' onClose={() => dispatch(codeActions.reset())}>Error: {code}, sign in again</Alert>}
              </Grid>
            </Grid>
          </Box>
          <Divider sx={{ width: "100%", fontWeight: "bold"}}>or</Divider>
          <Button 
           onClick={() =>
            submitFn({ email: 'GOOGLE', password: '' })} fullWidth variant="outlined" 
            sx={{mt: 2}}
             >

            <Avatar src="https://img.icons8.com/color/2x/google-logo.png" sx={{width:{xs: '6vh', sm: '6vw', lg: '3vw'}}}  />
        </Button>
          </Box>
        
        <Copyright sx={{ mt: 4, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}