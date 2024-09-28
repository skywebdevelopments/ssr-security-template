// app/protected/FetchAssetsButton.tsx
'use client'; // This makes the component a client component

import React from 'react';

interface FetchAssetsButtonProps {
  accessToken: string | undefined; // Accept accessToken as a prop
}

const FetchAssetsButton: React.FC<FetchAssetsButtonProps> = ({ accessToken }) => {
  const getAllAssets = async () => {
    if (!accessToken) {
      console.error("No access token found."); // Ensure access token is available
      return;
    }

    try {
      const response = await fetch(`${process.env.ASSETS_URL}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`, // Use the access token passed as a prop
          'Content-Type': 'application/json' // Optional: Specify content type
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`); // Handle HTTP errors
      }

      const assets = await response.json();
      console.log(assets); // Log the fetched assets
    } catch (error) {
      console.error("Error fetching assets:", error); // Log any errors
    }
  };

  return <>
  <button onClick={getAllAssets}>Get All Assets</button>;
  
  </>
};

export default FetchAssetsButton;
