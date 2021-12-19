import { Box, Button, Grid, Text, useToast, VStack } from "@chakra-ui/react";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { checkSolanaConnection, connectSolana } from "../api/walletAPI";
import { ColorModeSwitcher } from "../components/ColorModeSwitcher";
import { Connection, PublicKey } from "@solana/web3.js";
import { Program, Provider, web3 } from "@project-serum/anchor";
import { MintLayout, TOKEN_PROGRAM_ID, Token } from "@solana/spl-token";
import { programs } from "@metaplex/js";
import { candyMachineProgram } from "../api/helpers";

// const {
//   metadata: { Metadata, MetadataProgram },
// } = programs;

const config = new web3.PublicKey(
  process.env.REACT_APP_CANDY_MACHINE_CONFIG || ""
);
const { SystemProgram } = web3;
const opts = {
  preflightCommitment: "processed",
};

const Index = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const toast = useToast();

  const onConnectWallet = async () => {
    const address = await connectSolana();
    if (address) {
      setCurrentAccount(address);
    } else {
      toast({
        title: "Make sure you have the Phantom wallet!",
        description: "Get the chrome extension to connect your wallet",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    const onLoad = async () => {
      const address = await checkSolanaConnection();
      if (address) {
        console.log("ADDRESSS ");
        console.log(address);
        setCurrentAccount(address);
      }
    };

    // Phantom wallet suggests running it AFTER window loads
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  });

  // Declare getCandyMachineState as an async method
  const getCandyMachineState = async () => {
    const provider = getProvider();

    // Get metadata about your deployed candy machine program
    const idl = await Program.fetchIdl(candyMachineProgram, provider);

    // Create a program that you can call
    const program = new Program(idl, candyMachineProgram, provider);

    // Fetch the metadata from your candy machine
    const candyMachine = await program.account.candyMachine.fetch(
      process.env.REACT_APP_CANDY_MACHINE_ID || ""
    );

    // Parse out all our metadata and log it out
    const itemsAvailable = candyMachine.data.itemsAvailable.toNumber();
    const itemsRedeemed = candyMachine.itemsRedeemed.toNumber();
    const itemsRemaining = itemsAvailable - itemsRedeemed;
    const goLiveData = candyMachine.data.goLiveDate.toNumber();

    // We will be using this later in our UI so let's generate this now
    const goLiveDateTimeString = `${new Date(goLiveData * 1000).toUTCString()}`;

    console.log({
      itemsAvailable,
      itemsRedeemed,
      itemsRemaining,
      goLiveData,
      goLiveDateTimeString,
    });
  };

  useEffect(() => {
    getCandyMachineState();
  }, []);

  const getProvider = () => {
    const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST || "";
    // Create a new connection object
    const connection = new Connection(rpcHost);

    // Create a new Solana provider object
    const provider = new Provider(
      connection,
      window.solana,
      opts.preflightCommitment
    );

    return provider;
  };

  return (
    <Box textAlign="center" fontSize="xl">
      <Head>
        <title>nft playground</title>
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
          //   onSubmit={submitHandler}
        >
          {/* <Hero /> */}
          {/* Conditionally render connect button */}
          {currentAccount ? (
            <>
              {/* <Input
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
              <Waves waves={waves} /> */}
              <Text>DOG</Text>
            </>
          ) : (
            <Button onClick={onConnectWallet}>Connect Solana</Button>
          )}
        </VStack>
      </Grid>
    </Box>
  );
};

export default Index;
