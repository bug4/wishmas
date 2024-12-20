// HoldersCounter.jsx
import React, { useState, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

const HoldersCounter = () => {
  const [holdersCount, setHoldersCount] = useState('...');
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  
  // Replace these with your actual values
  const TOKEN_ADDRESS = "";
  const HELIUS_RPC = "https://mainnet.helius-rpc.com/?api-key=c6707fb2-9d2b-49d4-9421-fdcd4a01a5c7";

  useEffect(() => {
    const fetchHolderCount = async () => {
      if (!TOKEN_ADDRESS) return;
      
      setIsLoading(true);
      
      try {
        const connection = new Connection(HELIUS_RPC, 'confirmed');
        const tokenMint = new PublicKey(TOKEN_ADDRESS);

        try {
          const tokenAccounts = await connection.getProgramAccounts(
            TOKEN_PROGRAM_ID,
            {
              filters: [
                {
                  dataSize: 165,
                },
                {
                  memcmp: {
                    offset: 0,
                    bytes: tokenMint.toBase58(),
                  },
                },
              ],
            }
          );
          
          setRetryCount(0);
          setHoldersCount(tokenAccounts.length);

        } catch (error) {
          console.error('Initial fetch failed:', error);
          
          if (retryCount < 3) {
            setRetryCount(prev => prev + 1);
            setTimeout(fetchHolderCount, 2000);
            return;
          }
        }

      } catch (error) {
        console.error('Error fetching holder count:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHolderCount();
    const interval = setInterval(fetchHolderCount, 30000);
    return () => clearInterval(interval);
  }, [retryCount, TOKEN_ADDRESS]);

  return (
    <div className="absolute left-6 top-1/2 transform -translate-y-1/2 z-10">
      <div className="bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 p-6">
        <div className="text-lg text-white mb-2">$HOHO Holders</div>
        <div className="text-4xl font-bold text-white filter drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]">
          {isLoading ? (
            <span className="animate-pulse">Loading...</span>
          ) : (
            <span className="transition-all duration-500">
              {holdersCount.toLocaleString()}
            </span>
          )}
        </div>
        <div className="text-sm text-white text-opacity-80 mt-2">
          Live data via Solana
        </div>
      </div>
    </div>
  );
};

export default HoldersCounter;