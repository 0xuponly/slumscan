import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Alchemy, Network } from 'alchemy-sdk';
import axios from 'axios';
import { ethers } from 'ethers';

const settings = {
 apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
 network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function TransactionDetail() {
 const { transactionId } = useParams();
 const [transaction, setTransaction] = useState(null);
 const [ethPriceInBTC, setEthPriceInBTC] = useState(null);
 const [ethPriceInUSD, setEthPriceInUSD] = useState(null);
 
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
 
 useEffect(() => {
   async function getEthPrice() {
   const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=btc,usd');
   setEthPriceInBTC(response.data.ethereum.btc);
   setEthPriceInUSD(response.data.ethereum.usd);
   }
  
   getEthPrice();
  }, []);

 return (
 <div className="App">
 <div className="logo-container">
 <div className="logo">
 <h1>slumscan.io</h1>
 </div>
 <div className="eth-price-container">
 <p>Ξ1 = ${ethPriceInUSD} = ₿{ethPriceInBTC}</p>
 </div>
 </div>
 <p style={{ fontSize: '24px', backgroundColor: '#4d004d', paddingTop: '16px' }}>Transaction Details: {transactionIdShortened}</p>
 {transaction && (
 <div className="blockDetails">
 <p style={{ fontSize: '20px' }}>Transaction Details:</p>
 <table style={{ tableLayout: 'fixed', width: '100%', marginBottom: 0 }}>
 <tbody>
 {['hash', 'blockHash', 'blockNumber', 'confirmations', 'from', 'to', 'value', 'gasPrice', 'maxPriorityFeePerGas', 'maxFeePerGas', 'gasLimit', 'nonce', 'chainId'].map((key) => {
 if (transaction[key] === undefined) {
  return null;
 }
 return (
  <tr key={key}>
    <td>{key}</td>
    <td>
      {key === 'value' ? ethers.utils.formatUnits(transaction[key], 18) : 
      key === 'blockNumber' ? <Link to={`/block/${transaction[key]}`}>{transaction[key]}</Link> :
      key === 'from' || key === 'to' ? <Link to={`/address/${transaction[key]}`}>{transaction[key]}</Link> : transaction[key].toString()}
    </td>
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