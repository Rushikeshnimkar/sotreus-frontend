// pages/api/mintNFT.js

export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        const minterAddress = req.body.minter;
        const nftUri = req.body.nft_uri;
        const contractAddress = req.body.contract_address; // Make sure to add this to the request body
  
        // Perform any additional validation or processing if needed
  
        const response = await fetch(`https://explorer.aptoslabs.com/api/${contractAddress}/user_mint_NFT`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Add any other headers or authentication tokens as needed
          },
          body: JSON.stringify({ minter: minterAddress, nft_uri: nftUri }),
        });
  
        if (!response.ok) {
          throw new Error(`Failed to mint NFT: ${response.statusText}`);
        }
  
        const result = await response.json();
        res.status(200).json(result);
      } catch (error) {
        console.error('Error minting NFT:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  }
  