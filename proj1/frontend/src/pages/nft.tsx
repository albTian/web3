import { Button, Text, useToast, Image } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { checkSolanaConnection, connectSolana } from "../api/walletAPI";
import { Container } from "../components/Container";
import CandyMachine from "../components/CandyMachine";
import { mintToken, getMints } from "../api/candyAPI";
import { Keypair } from "@solana/web3.js";

const NFT = () => {
  // API specific
  const [walletAddress, setWalletAddress] = useState<Keypair>();
  const [mints, setMints] = useState([]);

  // Frontend specific
  const [isMining, setIsMining] = useState<boolean>(false);
  const [isLoadingMints, setIsLoadingMints] = useState<boolean>(true);
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
      setIsMining(true);
      const response = await mintToken(walletAddress);
      if (response !== 0) {
        toast({
          title: "Minting failed...",
          description: "Something went wrong while minting",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      setIsMining(false);
    }
  };

  useEffect(() => {
    const onLoad = async () => {
      const address = await checkSolanaConnection();
      setWalletAddress(address);
      setIsLoadingMints(true);
      await getMints(mints, setMints);
      setIsLoadingMints(false);
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
          {isLoadingMints ? (
            <Button
              isLoading={isLoadingMints}
              loadingText="loading previous mints..."
            ></Button>
          ) : (
            <>
              <Text>Already minted</Text>
              {mints.map((mint) => (
                <Image key={mint} src={mint} alt={`Minted NFT ${mint}`} />
              ))}
            </>
          )}
        </>
      ) : (
        <Button onClick={onConnectWallet}>👻 Connect Phantom</Button>
      )}
    </Container>
  );
};

export default NFT;
