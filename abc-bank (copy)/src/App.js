import './App.css';
import Login from './Pages/Login.js'
import Register from './Pages/Register.js'
import Dashboard from './Pages/Dashboard';
import CreateBankAccount from './Pages/CreateBankAccount';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Test from './Pages/Test';
import Home from './Pages/Home';
import UserProfile from './Pages/User/UserProfile';
import UserDashboard from './Pages/User/UserDashboard';
import ViewBankAccounts from './Pages/User/ViewBankAccounts';
import UserDetails from './Pages/UserDetails';
import AllBankAccounts from './Pages/AllBankAccounts';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//       </Routes>
//     </Router>
//   );
// }


function App() {
  return (
    <div className="App">
      
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/test' element={<Test />} />
          <Route path='/createBankAccount' element={<CreateBankAccount />} />
          <Route path='/userProfile' element={<UserProfile />} />
          <Route path='/userDashboard' element={<UserDashboard />} />
          <Route path='/viewbankaccounts' element={<ViewBankAccounts />} />
          <Route path='/users' element={<UserDetails />} />
          <Route path='/allbankaccounts' element={<AllBankAccounts />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
