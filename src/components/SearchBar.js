import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const isAddress = (id) => {
    // Ethereum addresses are 42 characters long and start with '0x'
    return /^0x[a-fA-F0-9]{40}$/.test(id);
   };

const isTransaction = (id) => {
    // Ethereum transaction IDs are 66 characters long and start with '0x'
    return /^0x[a-fA-F0-9]{64}$/.test(id);
   };
   
const isBlock = (id) => {
    // Ethereum block numbers are integers
    return Number.isInteger(Number(id));
   };

const SearchBar = () => {
 const [query, setQuery] = useState('');
 const navigate = useNavigate();

 const handleSearch = (e) => {
  e.preventDefault();
  if (isTransaction(query)) {
    navigate(`/tx/${query}`);
  } else if (isAddress(query)) {
    navigate(`/address/${query}`);
  } else if (isBlock(query)) {
    navigate(`/block/${query}`);
  }
 };

 return (
    <form onSubmit={handleSearch} className="search-bar-container">
     <input 
       type="text" 
       value={query} 
       onChange={(e) => setQuery(e.target.value)}
       placeholder="Search..."
     />
     <button type="submit">Search</button>
    </form>
   );
};

export default SearchBar;