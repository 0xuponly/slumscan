import './App.css';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import TransactionDetail from './components/TransactionDetail';
import AddressDetail from './components/AddressDetail';
import BlockDetail from './components/BlockDetail';
import LatestBlock from './components/LatestBlock';
import SearchBar from './components/SearchBar';

function App() {
 const [ethPriceInUSD] = useState(null);
 const [ethPriceInBTC] = useState(null);

 return (
  <div className="App">
    <SearchBar />
    <div className="logo-container">
      <div className="logo">
        <h1>slumscan.io</h1>
      </div>
    </div>
    <Routes>
      <Route path="/" element={<LatestBlock />} />
      <Route path="/tx/:transactionId" element={<TransactionDetail ethPriceInUSD={ethPriceInUSD} ethPriceInBTC={ethPriceInBTC} />} />
      <Route path="/address/:addressId" element={<AddressDetail ethPriceInUSD={ethPriceInUSD} ethPriceInBTC={ethPriceInBTC} />} />
      <Route path="/block/:blockId" element={<BlockDetail ethPriceInUSD={ethPriceInUSD} ethPriceInBTC={ethPriceInBTC} />} />
    </Routes>
  </div>
 );
}

export default App;