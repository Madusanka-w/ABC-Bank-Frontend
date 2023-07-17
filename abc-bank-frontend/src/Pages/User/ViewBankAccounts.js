import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  Button,
  CardActions,
  TextField,
  Modal,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { saveAs } from "file-saver";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  accountCard: {
    width: 400,
    marginBottom: 10,
  },
  transactionCard: {
    width: 400,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  listItemText: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  appBar: {
    marginBottom: 10,
  },
  backButton: {
    marginRight: 10,
  },
  modalContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  modalButton: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 5,

  },
};

function BankAccountPage() {
  const [userToken, setUserToken] = useState('');
  const [bankAccounts, setBankAccounts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [transactionType, setTransactionType] = useState('');
  const [transactionAmount, setTransactionAmount] = useState('');
  const [selectedBankAccount, setSelectedBankAccount] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem('token');
    const data = storedData ? JSON.parse(storedData) : null;
    setUserToken(data);

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
        setBankAccounts(response.data);
      } catch (error) {
        console.error('Error fetching bank accounts:', error);
      }
    };

    fetchBankAccounts();
  }, [userToken]);


  const notify = () => toast.success("Transaction Success!", {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  const errorNotify = () => toast.error("Not enough balance!", {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  const handleTransactionSubmit = async (event) => {
    event.preventDefault();

    let url = '';

    if (transactionType === 'deposit') {
      url = 'http://localhost:8080/api/v1/auth/transaction';

    } else if (transactionType === 'withdrawal') {
      url = 'http://localhost:8080/api/v1/auth/withdrawal';
    }

    try {
      const response = await axios.post(url + `/${transactionAmount}/${selectedBankAccount.id}`);
      console.log("response", response)
      //  if(response.data === 'Not enough balance'){
      //   toast.error(response.data, {
      //     position: "top-right",
      //     autoClose: 2000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "light",
      //   })
      // }else{
      //   notify()
      // }
      if(response.status == 200 ){
        notify()
      }


      const updatedBankAccounts = bankAccounts.map((account) => {
        if (account.accountNumber === response.data.accountNumber) {
          return response.data;
        }
        return account;
      });

      setBankAccounts(updatedBankAccounts);
      setShowForm(false);
      setTransactionType('');
      setTransactionAmount('');
      setSelectedBankAccount(null);
    } catch (error) {
      console.error('Error performing transaction:', error);
    }
  };
  console.log("data", bankAccounts)


  const handleSubmit = (id) => {
    axios
      .get('http://localhost:8080/api/v1/auth/pdf/' + id, {
        responseType: "blob",
      })
      .then((response) => {
        const blob = new Blob([response.data], { type: "application/pdf" });
        saveAs(blob, "bank_statement.pdf");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Box sx={styles.container}>
        <AppBar position="static" sx={styles.appBar}>
          <Toolbar>
            <Button
              variant="contained"
              color="primary"
              href="/userDashboard"
              startIcon={<ArrowBackIosIcon />}
              sx={styles.backButton}
            >
              Back to Home
            </Button>
            <Typography variant="h6" component="div">
              Bank Accounts
            </Typography>
          </Toolbar>
        </AppBar>

        {bankAccounts.map((account, index) => (
          <Card key={index} sx={styles.accountCard}>
            <CardContent>
              <Typography sx={styles.cardTitle}>{account.accountType}</Typography>
              <Typography variant="subtitle1">Account Number: {account.accountNumber}</Typography>
              <Typography variant="subtitle1">Balance: {account.accountBalance}</Typography>
              <Button
                onClick={() => handleSubmit(account.id)}
              >
                PDF
              </Button>
            </CardContent>

            <Card sx={styles.transactionCard}>
              <CardContent>
                <Typography sx={styles.cardTitle}>Transactions</Typography>
                <List>
                  {account.transactions.map((transaction, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={transaction.type}
                        secondary={transaction.amount}
                        sx={styles.listItemText}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>

              <CardActions>
                <Button
                  onClick={() => {
                    setTransactionType('deposit');
                    setSelectedBankAccount(account);
                    setShowForm(true);
                  }}
                >
                  Deposit
                </Button>
                <Button
                  onClick={() => {
                    setTransactionType('withdrawal');
                    setSelectedBankAccount(account);
                    setShowForm(true);
                  }}
                >
                  Withdrawal
                </Button>

              </CardActions>
            </Card>
          </Card>
        ))}

        <Modal open={showForm} onClose={() => setShowForm(false)}>
          <Box sx={styles.modalContainer}>
            <Box sx={styles.modalContent}>
              <Typography sx={styles.modalTitle}>
                {transactionType === 'deposit' ? 'Deposit' : 'Withdrawal'}
              </Typography>
              <form onSubmit={handleTransactionSubmit} sx={styles.modalForm}>
                <TextField
                  type="number"
                  label="Amount"
                  value={transactionAmount}
                  onChange={(event) => setTransactionAmount(event.target.value)}
                  required
                />
                <Button type="submit" variant="contained" color="primary" sx={styles.modalButton}>
                  Submit
                </Button>
              </form>
            </Box>
          </Box>
        </Modal>
      </Box>
      <ToastContainer />
      {/* <Pie data={data} /> */}
    </div>
  );
}

export default BankAccountPage;
