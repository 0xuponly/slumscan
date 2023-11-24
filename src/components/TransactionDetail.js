import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Alchemy, Network } from 'alchemy-sdk';
import LatestBlock from './LatestBlock';

const settings = {
 apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
 network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function TransactionDetail() {
 const { transactionId } = useParams();
 const [transaction, setTransaction] = useState(null);
 
 useEffect(() => { 
 async function getTransactionDetails() {
 try {
 const transaction = await alchemy.core.getTransaction(transactionId);
 console.log(transaction); // Check the transaction data
 setTransaction(transaction);
 } catch (error) {
 console.error(error); // Check for errors
 }
 }
 
 getTransactionDetails();
 }, [transactionId]);
 
 // console.log(transactionId); // Check the transactionId
 const transactionIdShortened = transactionId.substring(0, 6) + '...' + transactionId.substring(transactionId.length - 4);
 
 return (
 <div className="App">
 <div className="logo-container">
 <div className="logo">
 <h1>slumscan.io</h1>
 </div>
 <div className="eth-price-container">
 <p>Ξ1 = ${LatestBlock.ethPriceInUSD} = ₿{LatestBlock.ethPriceInBTC}</p>
 </div>
 </div>
 <p style={{ fontSize: '24px', backgroundColor: '#4d004d', paddingTop: '16px' }}>Transaction Details: {transactionIdShortened}</p>
 {transaction && (
 <div className="blockDetails">
 <p style={{ fontSize: '20px' }}>Transaction Details:</p>
 <table style={{ tableLayout: 'fixed', width: '100%', marginBottom: 0 }}>
 <tbody>
 {Object.keys(transaction).map((key) => {
 if (['difficulty', '_difficulty', 'transactions', 'type', 'accessList', 'transactionIndex', 'r', 's', 'v', 'creates', 'wait', 'data'].includes(key)) {
 return null;
 }
 return (
 <tr key={key}>
  <td>{key}</td>
  <td>{typeof transaction[key] === 'object' && transaction[key] !== null ? transaction[key].toString() : transaction[key]}</td>
 </tr>
 );
 })}
 </tbody>
 </table>
 </div>
 )}
 </div>
 );
}

export default TransactionDetail;