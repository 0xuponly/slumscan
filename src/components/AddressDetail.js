import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Alchemy, Network } from 'alchemy-sdk';
import { ethers } from 'ethers';
import axios from 'axios';

const settings = {
 apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
 network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function AddressDetail() {
 const { addressId } = useParams();
 const [address, setAddress] = useState(null);
 const [ethPriceInBTC, setEthPriceInBTC] = useState(null);
 const [ethPriceInUSD, setEthPriceInUSD] = useState(null);
 
 useEffect(() => { 
 async function getAddressDetails() {
 try {
 const address = await alchemy.core.getBalance(addressId);
 const ethValue = ethers.utils.formatEther(address);
 //console.log(ethValue); // Check the address data in Ether
 setAddress(ethValue);
 } catch (error) {
 console.error(error); // Check for errors
 }
 }
 
 getAddressDetails();
 }, [addressId]);
 
 const addressIdShortened = addressId.substring(0, 6) + '...' + addressId.substring(addressId.length - 4);

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
 <p style={{ fontSize: '20px', backgroundColor: '#4d004d', paddingTop: '16px' }}>Address Details: {addressIdShortened}</p>
 {address && (
 <div className="blockDetails">
 <p style={{ fontSize: '20px' }}>Address Details:</p>
 <table style={{ tableLayout: 'fixed', width: '100%', marginBottom: 0 }}>
 <tbody>
 <tr>
  <td>ETH Balance: {'Ξ'+address}</td>
 </tr>
 <tr>
  <td>ETH Value: {'$'+address*ethPriceInUSD}</td>
 </tr>
</tbody>

 </table>
 </div>
 )}
 </div>
 );
}

export default AddressDetail;