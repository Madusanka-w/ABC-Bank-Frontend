import { Card, CardContent, CardActions, Button } from '@mui/material';
import { Box } from '@mui/system';
import Home from '../Home'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';


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

  const [userToken, setUserToken] = useState('');
  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem('token');
    const data = storedData ? JSON.parse(storedData) : null;
    setUserToken(data);
    console.log("token", userToken)

    const fetchBankAccounts = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/api/v1/auth/getBankAccountofUser',
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        setTransaction(response.data[0].transactions);
        console.log("transaction", response.data[0].transactions)
      } catch (error) {
        console.error('Error fetching bank accounts:', error);
      }
    };

    fetchBankAccounts();
  }, [userToken]);

  ChartJS.register(ArcElement, Tooltip, Legend);
  const data = {
    labels: [ 'Deposits',
    'Withdrawals'],
    datasets: [
      {
        label: 'Transactions',
        data: [
          transaction.filter(transaction => transaction.type === 'DEPOSIT').length,
          transaction.filter(transaction => transaction.type === 'WITHDRAWAL').length
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',  // Color for Deposits
          'rgba(54, 162, 235, 0.2)',  // Color for Withdrawals
          'rgba(255, 206, 86, 0.2)',   // Color for Transfers
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',     // Border color for Deposits
          'rgba(54, 162, 235, 1)',     // Border color for Withdrawals
          'rgba(255, 206, 86, 1)',      // Border color for Transfers
        ],
        borderWidth: 1,
      }
      
    ],
  };


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

      {/* <Card sx={styles.cardContainer}>
        <CardContent>
          <h2 style={styles.heading}>New Bank Account</h2>
        </CardContent>

        <CardActions sx={styles.buttonContainer}>
          <Button variant="contained" href='/createBankAccount'>Create Account</Button>
        </CardActions>
      </Card> */}
      <Card sx={styles.cardContainer}>
      <Pie data={data} />
      </Card>
    </Box>
    
    </div>
  );
}


export default UserDashboard;