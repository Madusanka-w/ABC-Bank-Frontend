import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { Button } from '@mui/material';
import Home from './Home'

const useStyles = makeStyles({
  table: {
    marginTop: 20,
    minWidth: 650,
  },
  table1: {
    marginTop: 20,
    margin: 10
  },
});

export default function AllBankAccounts() {
  const classes = useStyles();
  const [accouts, setAccounts] = useState([]);
//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/api/v1/auth');
//       setUsers(response.data);
//       setIsLoading(false);
//       console.log("users", response.data);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//       setIsLoading(false);
//     }
//     console.log("users222", use);
//   };
  useEffect(() => {

    const fetchBankAccounts = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/api/v1/auth/bankAccounts');
        setAccounts(response.data);
        console.log("users", response.data)
      } catch (error) {
        console.error('Error fetching bank accounts:', error);
      }

    };

    fetchBankAccounts();
  }, []);

  const handleClick = async (id) => {
    try {
     axios.delete(
        'http://localhost:8080/api/v1/auth/deleteBankAccount/'+ id);
        alert("Deleted Successfully")
        window.location.href="/allbankaccounts"
    } catch (error) {
        alert("Error")
    }

  };

  

  return (
    <div>
        <Home />
 <TableContainer className={classes.table1} component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Account Number</TableCell>
            <TableCell align="center">Type</TableCell>
            <TableCell align="center">Balance</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        
        <TableBody>
          {accouts.map((user, index) => (
            <TableRow key={index}>
              <TableCell align="center">{user.accountNumber}</TableCell>
              <TableCell align="center">{user.type}</TableCell>
              <TableCell align="center">{user.accountBalance}</TableCell>
              <TableCell align="center">
              <Button type="primary" htmlType="submit"
              onClick={() => handleClick(user.id)}
              >
                  Delete
                </Button>
                  </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
   
  );
}
