import { Card, CardContent, CardActions, Button } from '@mui/material';
import { Box } from '@mui/system';
import Home from '../Home'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const styles = {
  cardContainer: {
    width: 400,
    marginTop: 10,
    marginInline: 'auto',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 2,
  },
};

function UserDashboard() {


  
  return (
    <div>
<Home />
   
    <Box>
      <Card sx={styles.cardContainer}>
        <CardContent>
          <h2 style={styles.heading}>View Account</h2>
        </CardContent>
        <CardActions sx={styles.buttonContainer}>
        <Link to={`/viewbankaccounts`}>
        <Button variant="contained" >View</Button>
        </Link>
          
        </CardActions>
      </Card>

      <Card sx={styles.cardContainer}>
        <CardContent>
          <h2 style={styles.heading}>New Bank Account</h2>
        </CardContent>

        <CardActions sx={styles.buttonContainer}>
          <Button variant="contained" href='/createBankAccount'>Create Account</Button>
        </CardActions>
      </Card>
    </Box>
    </div>
  );
}


export default UserDashboard;