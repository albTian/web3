import { Box, Button, Grid, Text, useToast, VStack } from "@chakra-ui/react";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { checkSolanaConnection, connectSolana } from "../api/walletAPI";
import { ColorModeSwitcher } from "../components/ColorModeSwitcher";

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
          console.log('ADDRESSS ');
          console.log(address);
          setCurrentAccount(address)
      }
    };

    // Phantom wallet suggests running it AFTER window loads
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  });

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

export default Index