import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Home from './Home'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { InputLabel, Select } from '@mui/material';
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

    const [accountNumber, setAccountNumber] = useState("");
    const [firstDeposit, setFirstDeposit] = useState("")
    const [accountType, setAccountType] = useState('')
    const [userToken, setUserToken] = useState('');

    let data = {
        accountNumber: accountNumber,
        accountBalance: firstDeposit,
        type: accountType
    }

    useEffect(() => {
        const storedData = localStorage.getItem('token');
        const data = storedData ? JSON.parse(storedData) : null;
        setUserToken(data);
    })

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("data", data)
        try {
            const response = await axios.post(
              'http://localhost:8080/api/v1/auth/createBankAccount',data,
              {
                headers: {
                  Authorization: `Bearer ${userToken}`,
                },
              }
            );
            toast("Account created")
        setTimeout(() => {
            window.location.href="/viewbankaccounts"
        }, 2000); 
            
          } catch (error) {
            console.error('Error fetching bank accounts:', error);
          }
    };

    return (
        <div>
            <Home />


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

                        <Typography component="h1" variant="h5">
                            Create Bank Account
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={1}>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="accountNumber"
                                        label="Account Number"
                                        name="email"
                                        value={accountNumber}
                                        onChange={(e) => setAccountNumber(e.target.value)}
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="firstDeposit"
                                        label="First Deposit"
                                        name="nic"
                                        value={firstDeposit}
                                        onChange={(e) => setFirstDeposit(e.target.value)}
                                        autoComplete="nic"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <InputLabel id="demo-simple-select-label">Account Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value="accountType"
                                        label="Type"
                                        onChange={(e) => setAccountType(e.target.value)}
                                    >
                                        <MenuItem value='SAVING'>Saving</MenuItem>
                                        <MenuItem value='CHECKING'>Checking</MenuItem>
                                    </Select>
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Create
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    );
}