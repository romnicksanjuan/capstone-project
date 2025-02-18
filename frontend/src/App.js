import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';


import Dashboard from './components/Dashboard';
import Items from './components/Items';
import BorrowedItems from './components/BorrowedItems';
import History from './components/History';
import AddBorrowItem from './components/AddBorrowItem';
import CreateProduct from './components/merchandise/CreateProduct';
import Merchandise from './components/merchandise/Merchandise.js';
import PurchaseHistory from './components/merchandise/PurchaseHistory.js';
import PropertyPage from './components/PropertyPage.js';

function App() {
// pota 
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/items' element={<Items />} />
        <Route path='/borrowed-items' element={<BorrowedItems />} />
        <Route path='/history' element={<History />} />
        <Route path='/add-borrow-item' element={<AddBorrowItem />} />
        <Route path='/merchandise' element={<Merchandise />} />
        <Route path='/create-product' element={<CreateProduct />} />
        <Route path='/get-purchase-history' element={<PurchaseHistory />} />
        <Route path='/item/:sn' element={<PropertyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
