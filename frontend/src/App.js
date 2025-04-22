import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';


import Dashboard from './components/Dashboard';
import BorrowedItems from './components/BorrowedItems';
import AddBorrowItem from './components/AddBorrowItem';
import CreateProduct from './components/merchandise/CreateProduct';
import Merchandise from './components/merchandise/Merchandise.js';
import PurchaseHistory from './components/merchandise/PurchaseHistory.js';
import Login from './components/Login.js';
import ForgotPassword from './components/ForgotPassword.js';
// import Test from './components/Test.js';
import BorrowedTransaction from './components/BorrowedTransaction.js';
import MerchandiseTransaction from './components/merchandise/MerchandiseTransaction.js';
import SignUp from './components/SignUp.js';
import BorrowForm from './components/BorrowForm.js';
import ManageMerchandise from './components/merchandise/ManageMerchandise.js';
import Inventory from './components/Inventory.js';
import ReturnedItems from './components/ReturnedItems.js';
import Settings from './components/Settings.js';
import RequestItems from './components/RequestItems.js';
import Users from './components/Users.js';
// import Test from './components/Category.js';
// import Testing from './components/Test.js';

function App() {
  // pota 
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/Dashboard' element={<Dashboard />} />
        <Route path='/inventory' element={<Inventory />} />
        <Route path='/borrowed-items' element={<BorrowedItems />} />
        <Route path='/borrowed-transaction-details' element={<BorrowedTransaction />} />
        <Route path='/returned-items' element={<ReturnedItems />} />
        <Route path='/add-borrow-item' element={<AddBorrowItem />} />
        <Route path='/merchandise' element={<Merchandise />} />
        <Route path='/create-product' element={<CreateProduct />} />
        <Route path='/get-purchase-history' element={<PurchaseHistory />} />
        <Route path='/purchase-transaction-details' element={<MerchandiseTransaction />} />
        <Route path='/manage-mechandise' element={<ManageMerchandise />} />
        <Route path='/borrow-form/:sn' element={<BorrowForm />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/request-items' element={<RequestItems />} />
        <Route path='/user-list' element={<Users />} />

        
        {/* <Route path='/test' element={<Test />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
