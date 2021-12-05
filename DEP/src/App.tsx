import * as React from "react";
import { Box, Button, Grid, Input, useToast, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { checkWalletConnection, connectWallet } from "./api/walletAPI";
import { getAllWaves, wave } from "./api/wavePortalAPI";
import { ColorModeSwitcher } from "./components/ColorModeSwitcher";
import Hero from "./components/Hero";
import { Logo } from "./Logo";

export const App = () => {
  // API specific
  const [currentAccount, setCurrentAccount] = useState("");
  const [waves, setWaves] = useState<any[]>([]);

  // Frontend specific
  const [inputMessage, setInputMessage] = useState("");
  const toast = useToast();

  const onConnectWallet = async () => {
    const account = await connectWallet();
    if (account) {
      setCurrentAccount(account);
    } else {
      toast({
        title: "Make sure you have metamask!",
        description: "Get the chrome extension to connect your wallet",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const updateAllWaves = async () => {
    const newWaves = await getAllWaves();
    if (newWaves) {
      console.log(newWaves);
      setWaves(newWaves);
    } else {
      console.log(`waves is empty or some shit went wrong`);
    }
  };

  const handleChange = (event: any) => setInputMessage(event.target.value);

  // Run on load
  useEffect(() => {
    // Funky async magic to run async functions inside a non async signature
    // Can use anything that needs account on startup in the snippet below
    (async () => {
      const account = await checkWalletConnection();
      if (account && account !== currentAccount) {
        setCurrentAccount(account);
      }
    })();

    updateAllWaves()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>
          <Logo h="40vmin" pointerEvents="none" />
          {waves.length > 0 && (
            <Hero
              title={waves[waves.length - 1].message}
              account={waves[waves.length - 1].address}
            />
          )}
          {/* Conditionally render connect button */}
          {currentAccount ? (
            <>
              <Input
                value={inputMessage}
                onChange={handleChange}
                placeholder={"Send me a message to show it here"}
              />
              <Button onClick={() => wave(inputMessage)}>wave at me!</Button>
              <Button onClick={updateAllWaves}>update all waves</Button>
            </>
          ) : (
            <Button onClick={onConnectWallet}>Connect Metamask</Button>
          )}
        </VStack>
      </Grid>
    </Box>
  );
};
