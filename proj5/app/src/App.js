import React, { useEffect, useState } from 'react';
import './App.css';
import twitterLogo from './assets/twitter-logo.svg';
import { checkSolanaConnection, connectSolana } from "./api/walletAPI"
import CandyMachine from './CandyMachine';

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;


const App = () => {
  const [walletAddress, setWalletAddress] = useState()

  const handleConnect = async () => {
    const address = await connectSolana()
    if (address) {
      setWalletAddress(address)
    }
  }

  // Phantom wants us to check the wallet AFTER the window loads
  useEffect(() => {
    const onLoad = async () => {
      const address = await checkSolanaConnection();
      if (address) {
        setWalletAddress(address)
        console.log(`address: ${address}`)
        console.log(address.publicKey)
        console.log(`window.solana: ${window.solana}`)
        console.log(window.solana.publicKey)
      }
    };

    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">🍭 Candy Drop</p>
          <p className="sub-text">NFT drop machine with fair mint</p>
          {walletAddress ?
            <CandyMachine walletAddress={walletAddress} />
            :
            <button
              className="cta-button connect-wallet-button"
              onClick={handleConnect}
            >
              Connect to Wallet
            </button>
          }
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
