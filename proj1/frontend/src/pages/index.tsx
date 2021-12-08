import { Box, Button, Grid, Input, useToast, VStack } from "@chakra-ui/react";
import { ethers } from "ethers";
import Head from 'next/head';
import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import { checkWalletConnection, connectWallet } from "../api/walletAPI";
import { getAllWaves, getWaveContract, wave } from "../api/wavePortalAPI";
import { ColorModeSwitcher } from "../components/ColorModeSwitcher";
import Hero from "../components/Hero";
import Waves from "../components/Waves";

const Index = () => {
  // API specific
  const [currentAccount, setCurrentAccount] = useState("");
  const [waves, setWaves] = useState<any[]>([]);

  // Frontend specific
  const [inputMessage, setInputMessage] = useState("");
  const toast = useToast();
  const [isMining, setIsMining] = useState(false);

  const onConnectWallet = async () => {
    const account = await connectWallet();
    if (account) {
      setCurrentAccount(account);
      updateAllWaves();
    } else {
      toast({
        title: "Make sure you have metamask!",
        description: "Get the chrome extension to connect your wallet",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const updateAllWaves = async () => {
    const newWaves = await getAllWaves();
    if (newWaves) {
      setWaves(newWaves);
    } else {
      console.log(`waves is empty or some shit went wrong`);
    }
  };

  const onWave = async (_message: string) => {
    setIsMining(true);
    const waveSuccess = await wave(_message);
    if (!waveSuccess) {
      toast({
        title: "Something went wrong...",
        description: "You may only send 1 wave per minute to prevent spamming",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    updateAllWaves();
    setIsMining(false);
  };

  const handleChange = (event: any) => setInputMessage(event.target.value);

  const submitHandler = (event: BaseSyntheticEvent) => {
    event.preventDefault();
    onWave(inputMessage);
  };

  // Run on load
  useEffect(() => {
    // Funky async magic to run async functions inside a non async signature and use the awaited value
    // Can use anything that needs account on startup in the snippet below
    (async () => {
      const account = await checkWalletConnection();
      if (account && account !== currentAccount) {
        setCurrentAccount(account);
      }
    })();

    updateAllWaves();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Listen in for emitter events!
  //  */
  useEffect(() => {
    const wavePortalContract = getWaveContract();
    if (wavePortalContract) {
      wavePortalContract.on("NewWave", updateAllWaves);
    }

    return () => {
      if (wavePortalContract) {
        wavePortalContract.off("NewWave", updateAllWaves);
      }
    };
  }, []);

  return (
    <Box textAlign="center" fontSize="xl">
      <Head>
        <title>web3 playground</title>
      </Head>
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        {/* The entire center stack */}
        <VStack
          spacing={8}
          mt={"15vh"}
          mb={"10vh"}
          mx={"auto"}
          width={[325, 450, 600]}
          as={"form"}
          onSubmit={submitHandler}
        >
          <Hero />
          {/* Conditionally render connect button */}
          {currentAccount ? (
            <>
              <Input
                value={inputMessage}
                onChange={handleChange}
                placeholder={"Send me a message to show it below"}
              />
              <Button
                width={"100%"}
                type="submit"
                isLoading={isMining}
                loadingText={"mining ..."}
              >
                👋 wave at me!
              </Button>
              <Waves waves={waves} />
            </>
          ) : (
            <Button onClick={onConnectWallet}>Connect Metamask</Button>
          )}
        </VStack>
      </Grid>
    </Box>
  );
};

export default Index;
