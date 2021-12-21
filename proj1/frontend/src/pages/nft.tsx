import { Button, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { checkSolanaConnection, connectSolana } from "../api/walletAPI";
import { Container } from "../components/Container";
import CandyMachine from "../components/CandyMachine";
import { mintToken } from "../api/candyAPI";
import { Keypair } from "@solana/web3.js";

const NFT = () => {
  // API specific
  const [walletAddress, setWalletAddress] = useState<Keypair>();
  const [mints, setMints] = useState([]);

  // Frontend specific
  const [isMining, setIsMining] = useState<boolean>(false);
  const toast = useToast();

  const onConnectWallet = async () => {
    const address = await connectSolana();
    if (address) {
      setWalletAddress(address);
      // updateAllWaves();
    } else {
      toast({
        title: "Make sure you have phantom wallet!",
        description: "Get the chrome extension to connect your wallet",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleMint = async () => {
    if (walletAddress) {
      console.log('walletAddress');
      console.log(walletAddress);
      
      setIsMining(true)
      await mintToken(walletAddress)
      setIsMining(false)
    }
  }

  useEffect(() => {
    const onLoad = async () => {
      const address = await checkSolanaConnection();
      setWalletAddress(address);
    };

    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <Container>
      <Text>GET YOUR NFTS HERE</Text>
      <Text>Cnady drop</Text>
      {walletAddress ? (
        <>
          <Button
            width={"100%"}
            onClick={handleMint}
            isLoading={isMining}
            loadingText={"mining ..."}
          >
            ✨ mint NFT
          </Button>
        </>
      ) : (
        <Button onClick={onConnectWallet}>👻 Connect Phantom</Button>
      )}
    </Container>
  );
};

export default NFT;
