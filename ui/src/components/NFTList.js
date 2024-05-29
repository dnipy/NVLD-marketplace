import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NFTList = () => {
  const [nfts, setNFTs] = useState([]);

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const response = await axios.get('/nfts');
        setNFTs(response.data);
      } catch (error) {
        console.error('Error fetching NFTs:', error);
      }
    };

    fetchNFTs();
  }, []);

  return (
    <div>
      <h2>NFTs</h2>
      <ul>
        {nfts.map((nft) => (
          <li key={nft.id}>{nft.title} - {nft.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default NFTList;