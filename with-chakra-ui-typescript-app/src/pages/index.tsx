import {
  Link as ChakraLink,
  Text,
  Code,
  List,
  ListIcon,
  ListItem,
  useToast,
  Box,
  Button,
  Grid,
  Input,
  VStack,
} from "@chakra-ui/react";
import { CheckCircleIcon, LinkIcon } from "@chakra-ui/icons";

import { Hero } from "../components/Hero";
import { Container } from "../components/Container";
import { Main } from "../components/Main";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { CTA } from "../components/CTA";
import { Footer } from "../components/Footer";
import React, { useState, useEffect } from "react";
import { connectWallet, checkWalletConnection } from "../api/walletAPI";
import { getAllWaves, wave } from "../api/wavePortalAPI";
import { ColorModeSwitcher } from "../components/ColorModeSwitcher";

// const Index = () => (
//   <Container height="100vh">
//     <Hero />
//     <Main>
//       <Text>
//         Example repository of <Code>Next.js</Code> + <Code>chakra-ui</Code> +{' '}
//         <Code>TypeScript</Code>.
//       </Text>

//       <List spacing={3} my={0}>
//         <ListItem>
//           <ListIcon as={CheckCircleIcon} color="green.500" />
//           <ChakraLink
//             isExternal
//             href="https://chakra-ui.com"
//             flexGrow={1}
//             mr={2}
//           >
//             Chakra UI <LinkIcon />
//           </ChakraLink>
//         </ListItem>
//         <ListItem>
//           <ListIcon as={CheckCircleIcon} color="green.500" />
//           <ChakraLink isExternal href="https://nextjs.org" flexGrow={1} mr={2}>
//             Next.js <LinkIcon />
//           </ChakraLink>
//         </ListItem>
//       </List>
//     </Main>

//     <DarkModeSwitch />
//     <Footer>
//       <Text>Next ❤️ Chakra</Text>
//     </Footer>
//     <CTA />
//   </Container>
// )

const Index = () => {
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

    updateAllWaves();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>
          {/* <Logo h="40vmin" pointerEvents="none" /> */}
          {waves.length > 0 && (
            <Hero
              title={waves[waves.length - 1].message}
              address={waves[waves.length - 1].address}
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

export default Index;
