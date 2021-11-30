import * as React from "react";
import {
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  Button,
  useToast,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Logo } from "./Logo";
import { useEffect, useState } from "react";
// import detectEthereumProvider from "@metamask/detect-provider";

export const App = () => {
  // State to store currentAccount
  const [currentAccount, setCurrentAccount] = useState("");
  const toast = useToast();

  // To check if the wallet is connected (if etherium exists on window)
  const checkWalletConnection = async () => {
    try {
      // To check if we actually have metamask
      // const provider = (await detectEthereumProvider()) as any;
      const provider = window.ethereum;
      if (!provider) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the provider object", provider);
      }

      // Check if we have authorization
      const accounts = await provider.request({ method: "eth_accounts" });

      // Get first account (?)
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
        console.log(`currentAccount: ${currentAccount}`);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      // const provider = (await detectEthereumProvider()) as any;
      const provider = window.ethereum;
      if (!provider) {
        // alert("Make sure you have metamask!");
        toast({
          title: "Make sure you have metamask!",
          description: "Get the chrome extension to connect your wallet",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        return;
      } else {
        console.log("We have the provider object", provider);
      }

      const accounts = await provider.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  // Run on load
  useEffect(() => {
    checkWalletConnection();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>
          <Logo h="40vmin" pointerEvents="none" />
          <Text>
            Edit <Code fontSize="xl">src/App.tsx</Code> and save to reload.
          </Text>
          <Link
            color="teal.500"
            href="https://chakra-ui.com"
            fontSize="2xl"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn Chakra
          </Link>
          {!currentAccount && (
            <Button onClick={connectWallet}>Connect Metamask</Button>
          )}
        </VStack>
      </Grid>
    </Box>
  );
};
