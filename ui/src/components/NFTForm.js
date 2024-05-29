import React, { useState } from 'react';
import axios from 'axios';

const NFTForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tokenURI, setTokenURI] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/nfts', { title, description, tokenURI });
      alert('NFT minted successfully');
    } catch (error) {
      console.error('Error minting NFT:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h2>Mint NFT</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="text" placeholder="Token URI" value={tokenURI} onChange={(e) => setTokenURI(e.target.value)} />
        <button type="submit">Mint NFT</button>
      </form>
    </div>
  );
};

export default NFTForm;