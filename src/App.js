import './App.css';
import { Routes, Route } from 'react-router-dom';
import TransactionDetail from './components/TransactionDetail';
import AddressDetail from './components/AddressDetail';
import BlockDetail from './components/BlockDetail';
import LatestBlock from './components/LatestBlock';
import SearchBar from './components/SearchBar';
import Footer from './components/Footer';

function App() {
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
      <Route path="/tx/:transactionId" element={<TransactionDetail/>} />
      <Route path="/address/:addressId" element={<AddressDetail/>} />
      <Route path="/block/:blockNumber" element={<BlockDetail/>} />
    </Routes>
    <Footer />
  </div>
 );
}

export default App;