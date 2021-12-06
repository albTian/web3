import { HStack, Text } from "@chakra-ui/react";
import React from "react";

const Wave = ({ message, address }: { message: string; address: string }) => (
  <HStack
    justifyContent="space-between"
    alignItems="top"
    // linear-gradient(135deg, #CB5EEE 0%, #4BE1EC 100%)
    bgGradient="linear(to-l, #7928CA, #FF0080)"
    // bgGradient="linear(135deg, #CB5EEE 0%, #4BE1EC 100%)"

    bgClip="text"
    width={"100%"}
    border="1px solid #E2E8F0"
    borderRadius="5px"
    p={1}
  >
    <Text textAlign="left" >{message}</Text>
    <Text>{address.substring(0, 10)}...</Text>
  </HStack>
);

Wave.defaultProps = {
  title: "with-chakra-ui-typescript",
  address: "no one",
};

export default Wave;
