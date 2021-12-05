import * as React from "react";
import { Box, Button, Grid, Input, useToast, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { checkWalletConnection, connectWallet } from "./api/walletAPI";
import { getMessage, sendMessage, wave } from "./api/wavePortalAPI";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import Hero from "./components/Hero";
import { Logo } from "./Logo";

export const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [message, setMessage] = useState("");
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

  const handleChange = (event: any) => setInputMessage(event.target.value);

  // Run on load
  useEffect(() => {
    (async () => {
      const account = await checkWalletConnection();
      if (account && account !== currentAccount) {
        setCurrentAccount(account);
      }
    })();

    (async () => {
      const newMessage = await getMessage();
      if (newMessage) {
        setMessage(newMessage);
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>
          <Logo h="40vmin" pointerEvents="none" />
          <Hero title={message} account={currentAccount} />
          {currentAccount ? (
            <>
              <Input
                value={inputMessage}
                onChange={handleChange}
                placeholder={"Send me a message to show it here"}
              />
              <Button onClick={() => sendMessage(inputMessage)}>
                send message
              </Button>
              <Button onClick={wave}>wave at me!</Button>
            </>
          ) : (
            <Button onClick={onConnectWallet}>Connect Metamask</Button>
          )}
        </VStack>
      </Grid>
    </Box>
  );
};
