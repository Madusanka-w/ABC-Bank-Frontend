import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (formData) => {
    console.log("formdat", formData)
    try {
      let res = await axios.post("http://localhost:8080/api/v1/auth/dto", formData);
      if (res) {
        alert("Registered Successfully");
        window.location.href = "/";
      } else {
        alert("Some error occurred");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={1}>
              <Grid item xs={12} >
                <TextField
                  {...register('firstName', { required: true })}
                  autoComplete="given-name"
                  type="text"
                  id="firstName"
                  placeholder="First Name"
                />
                {errors.firstName && <span>This field is required</span>}
              </Grid>
              <Grid item xs={12} >
                <TextField
                  {...register('lastName', { required: true })}
                  autoComplete="family-name"
                  type="text"
                  id="lastName"
                  placeholder="Last Name"
                />
                {errors.lastName && <span>This field is required</span>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('email', { required: true })}
                  autoComplete="email"
                  type="email"
                  id="email"
                  placeholder="Email Address"
                />
                {errors.email && <span>This field is required</span>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('nic', { required: true })}
                  autoComplete="nic"
                  type="text"
                  id="nic"
                  placeholder="NIC Number"
                />
                {errors.nic && <span>This field is required</span>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('contactNumber', { required: true })}
                  autoComplete="contactNumber"
                  type="text"
                  id="contactNumber"
                  placeholder="Contact Number"
                />
                {errors.contactNumber && <span>This field is required</span>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('addressLine1', { required: true })}
                  autoComplete="addressLine1"
                  type="text"
                  id="addressLine1"
                  placeholder="Address Line 1"
                />
                {errors.addressLine1 && <span>This field is required</span>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('addressLine2', { required: true })}
                  autoComplete="addressLine2"
                  type="text"
                  id="addressLine2"
                  placeholder="Address Line 2"
                />
                {errors.addressLine2 && <span>This field is required</span>}
              </Grid>
              <Grid item xs={12} >
                <TextField
                  {...register('city', { required: true })}
                  autoComplete="address-level2"
                  type="text"
                  id="city"
                  placeholder="City"
                />
                {errors.city && <span>This field is required</span>}
              </Grid>
              <Grid item xs={12} >
                <TextField
                  {...register('country', { required: true })}
                  autoComplete="country"
                  type="text"
                  id="country"
                  placeholder="Country"
                />
                {errors.country && <span>This field is required</span>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('password', { required: true })}
                  autoComplete="new-password"
                  type="password"
                  id="password"
                  placeholder="Password"
                />
                {errors.password && <span>This field is required</span>}
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <input
                      {...register('agree', { required: true })}
                      type="checkbox"
                      id="agree"
                    />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
                {errors.agree && <span>You must agree to continue</span>}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
