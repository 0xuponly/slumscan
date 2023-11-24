import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Alchemy, Network } from 'alchemy-sdk';
import { ethers } from 'ethers';
import LatestBlock from './LatestBlock';

const settings = {
 apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
 network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function AddressDetail() {
 const { addressId } = useParams();
 const [address, setAddress] = useState(null);
 
 useEffect(() => { 
 async function getAddressDetails() {
 try {
 const address = await alchemy.core.getBalance(addressId);
 const ethValue = ethers.utils.formatEther(address);
 console.log(ethValue); // Check the address data in Ether
 setAddress(ethValue);
 } catch (error) {
 console.error(error); // Check for errors
 }
 }
 
 getAddressDetails();
 }, [addressId]);
 
 const addressIdShortened = addressId.substring(0, 6) + '...' + addressId.substring(addressId.length - 4);
 
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
 <p style={{ fontSize: '24px', backgroundColor: '#4d004d', paddingTop: '16px' }}>Address Details: {addressIdShortened}</p>
 {address && (
 <div className="blockDetails">
 <p style={{ fontSize: '20px' }}>Address Details:</p>
 <table style={{ tableLayout: 'fixed', width: '100%', marginBottom: 0 }}>
 <p>ETH Value: {address}</p> {/* Display the address value */}
 </table>
 </div>
 )}
 </div>
 );
}

export default AddressDetail;