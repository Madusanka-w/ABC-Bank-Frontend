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

export default function DenseTable() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
          'http://localhost:8080/api/v1/auth');
        setUsers(response.data.body);
        console.log("users", response.data.body)
      } catch (error) {
        console.error('Error fetching bank accounts:', error);
      }

    };

    fetchBankAccounts();
  }, []);

  const handleClick = async (id) => {
    try {
     axios.delete(
        'http://localhost:8080/api/v1/auth/delete/'+ id);

        alert("Register Successfully")
        window.location.href="/users"

    } catch (error) {
      console.error('Error fetching :', error);
    }

  };

  

  return (
    <div>
        <Home />
 <TableContainer className={classes.table1} component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">First Name</TableCell>
            <TableCell align="center">Last Name</TableCell>
            <TableCell align="center">NIC</TableCell>
            <TableCell align="center">Contact</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={index}>
              <TableCell align="center">{user.firstName}</TableCell>
              <TableCell align="center">{user.lastName}</TableCell>
              <TableCell align="center">{user.nic}</TableCell>
              <TableCell align="center">{user.contactNumber}</TableCell>
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
