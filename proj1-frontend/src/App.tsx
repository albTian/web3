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
import { ethers } from "ethers";
import abi from "./utils/WavePortal.json";
// import detectEthereumProvider from "@metamask/detect-provider";

export const App = () => {
  // Hardcoded address vars
  const contractAddress = "0xA7B7E4ec4b5c3d7892690b6810F7F2C8a818d603";
  const contractABI = abi.abi;
  // State to store currentAccount
  const [currentAccount, setCurrentAccount] = useState("");
  const toast = useToast();

  // To check if the wallet is connected (if etherium exists on window)
  const checkWalletConnection = async () => {
    try {
      // To check if we actually have metamask
      // const provider = (await detectEthereumProvider()) as any;
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      // Check if we have authorization
      const accounts = await ethereum.request({ method: "eth_accounts" });

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
      const { ethereum } = window;
      if (!ethereum) {
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
        console.log("We have the ethereum object", ethereum);
      }

      // Actual request to connect metamask account
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const wave = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        const waveTxn = await wavePortalContract.wave();
        console.log("Mining...", waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);

        let count = await wavePortalContract.getTotalWaves();
        console.log(`total of ${count.toNumber()} waves`);
      } else {
        console.log("no etherium object lol");
      }
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
          {currentAccount ? (
            <Button onClick={wave}>wave at me!</Button>
          ) : (
            <Button onClick={connectWallet}>Connect Metamask</Button>
          )}
        </VStack>
      </Grid>
    </Box>
  );
};
