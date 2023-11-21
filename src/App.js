import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const settings = {
 apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
 network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function App() {
 const [blockNumber, setBlockNumber] = useState(null);
 const [block, setBlock] = useState(null);
 const [transactions, setTransactions] = useState([]);

 useEffect(() => { 
 async function getLatestBlockNumber() {
 const blockNumber = await alchemy.core.getBlockNumber();
 setBlockNumber(blockNumber);
 const latestBlock = await alchemy.core.getBlock(blockNumber);
 setBlock(latestBlock);
 setTransactions(latestBlock.transactions);
 }

 getLatestBlockNumber();
 }, [setBlock, setBlockNumber, setTransactions]);

 return (
 <div className="App">
   <div className="logo">
   <h1>slumscan.io</h1>
 </div>
 <p style={{ fontSize: '24px', backgroundColor: '#4d004d', paddingTop: '16px' }}>Latest Block: {blockNumber ? blockNumber : 'Loading...'}</p>
 {block && (
 <div className="blockDetails">
 <p style={{ fontSize: '20px' }}>Block Details:</p>
 <table>
  <tbody>
    <tr>
      <td>Block Number</td>
      <td>{blockNumber}</td>
    </tr>
    {Object.keys(block).map((key) => {
      if (['nonce', 'difficulty', '_difficulty', 'transactions'].includes(key)) {
        return null;
      }
      return (
        <tr key={key}>
          <td>{key}</td>
          <td>{typeof block[key] === 'object' && block[key] !== null ? block[key].toString() : block[key]}</td>
        </tr>
      );
    })}
  </tbody>
 </table>
 </div>
)}
 {transactions.length > 0 && (
 <div className="transactions">
 Transactions:
 <table>
   <tbody>
     {transactions.map((transaction, index) => (
       <tr key={index}>
         <td><Link to={`/transaction/${transaction}`}>{transaction}</Link></td>
       </tr>
     ))}
   </tbody>
 </table>
 </div>
 )}
 </div>
 );
}

export default App;
