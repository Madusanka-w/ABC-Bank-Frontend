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
import axios from 'axios'
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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


const { register, handleSubmit } = useForm();


  const onSubmit = async (formdata) => {
    
 
    console.log("data", formdata)
    try{
      let res = await axios.post("http://localhost:8080/api/v1/auth/dto", formdata)
      if (res) {
        toast("Registered Successfully")
        setTimeout(() => {
          window.location.href = "/"
        }, 2000); 
      }else {
        alert("some error occured")
      }
    }catch(err){
      console.log(err)
    }
  };

  return (
    <div>
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
            <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  {...register("firstName")}
                  // value={firstName}
                  // onChange={(e) => setFirstName(e.target.value)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  {...register("lastName")}
                  // value={lastName}
                  // onChange={(e) => setLastName(e.target.value)}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  {...register("email", { 
                    pattern:{
                      value: '/^[A-Z0-9._%+-]+@[A-Z0-9.-]+[A-Z]{2,}$/i',
                      message: 'Invalid Email'
                    },
                    })}
                  autoComplete="email"
  
                />
                
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="nic"
                  label="NIC Number"
                  name="nic"
                  {...register("nic")}
                  // value={nic}
                  // onChange={(e) => setNic(e.target.value)}
                  autoComplete="nic"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="contactNumber"
                  label="Contact Number"
                  name="contactNumber"
                  {...register("contactNumber")}
                  // value={contactNumber}
                  // onChange={(e) => setContactNumber(e.target.value)}
                  autoComplete="contactNumber"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="addressLine1"
                  label="Address Line 1"
                  name="addressLine1"
                  {...register("addressLine1")}
                  // value={addressLine1}
                  // onChange={(e) => setAddressLine1(e.target.value)}
                  autoComplete="addressLine1"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="addressLine2"
                  label="Address Line 2"
                  name="addressLine2"
                  {...register("addressLine2")}
                  // value={addressLine2}
                  // onChange={(e) => setAddressLine2(e.target.value)}
                  autoComplete="addressLine2"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="city"
                  required
                  fullWidth
                  id="ciry"
                  label="City"
                  {...register("city")}
                  // value={city}
                  // onChange={(e) => setCity(e.target.value)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="country"
                  label="Country"
                  name="country"
                  {...register("country")}
                  // value={country}
                  // onChange={(e) => setCountry(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  {...register("password")}
                  // value={password}
                  // onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
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
    <ToastContainer />
    </div>
  );
}